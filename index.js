const fs = require('fs');
const pm2 = require('pm2');

const files = fs.readdirSync('data/chunks');

if (!files.length) {
  console.error('You need to split the csv file with npm run split-csv command in CLI.')
  process.exit()
}

function startProcess (fileIndex) {
  console.log('start process : ' + fileIndex)
  const chunk = 'chunk-' + fileIndex + '.csv';

  pm2.start({
    name: chunk,
    script: 'utils/register_mongodb.js',
    exec_mode: 'cluster',
    instances: 1,
    args: chunk,
    max_memory_restart: '4G',
    autorestart: false,
    watch: false,
    out_file: './logs/chunks/chunk.log',
  }, function (err, apps) {
    if (err) {
      console.log('error in pm2:', err, apps)
      pm2.disconnect();
    }
  });
}

pm2.connect(function (err) {
  if (err) {
    console.error('error in pm2 connect', err);
    process.exit(2);
  }

  let fileToRegister = 0
  let timer = 0

  for (let processes = 0; processes < 6; processes++) {
    startProcess(fileToRegister)
    fileToRegister++
  }

  pm2.launchBus(function (err, bus) {
    bus.on('process:end', function (packet) {
      console.log('end of process :'+ packet.process.name)
      pm2.delete(packet.process.name, function (e) {
        if (e) {
          console.error('Error on process deleting.', e)
          process.exit()
        }
      });
      timer = timer + packet.data.timer
      if (fileToRegister >= files.length) {
        pm2.list(function(err, list) {
          timer = Number((timer).toFixed(0))

          console.log('Remaining processes: ' + list.length + ', total execution time in s: ' + timer
            + ', or ' + Math.trunc(timer / 60) + ' minutes and ' + timer % 60 + 'seconds');
        })
      } else {
        startProcess(fileToRegister)
        fileToRegister++
      }
    });
    bus.on('process:error', function (packet) {
      console.error('Error during script execution: ', packet.data.error)
      pm2.disconnect();
    });

    // TODO add pause bus
 /* pm2.list((err, list) => {
      list.map(item => {
        pm2.delete(item.pm_id);
      })
    });*/
  });
});
