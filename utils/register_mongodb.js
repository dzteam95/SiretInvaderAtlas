const csv = require('csvtojson')
var hrtime = require('process.hrtime');

const {onConnection, Enterprise} = require('./mongoose')

const chunk = process.argv[2]

function splitArray(array) {
  const desiredArraySize = 1000;
  let splittedArray = [];

  for(var i = 0; i < array.length; i += desiredArraySize) {
    splittedArray.push(array.slice(i, i+desiredArraySize));
  }

  return splittedArray
}

try {
  onConnection(async () => {
    let executionTime = hrtime()
    console.log('chunk ' + chunk)

    console.time('translate in json')
    const jsonArray = await csv()
      .fromFile(`data/chunks/${chunk}`);
    console.timeEnd('translate in json')

    let splittedJsonArray = splitArray(jsonArray)

    console.time('bulk')
    for (let i = 0; i < splittedJsonArray.length; i++) {
      console.log('iteration ' + i + '/' + splittedJsonArray.length)
      let r = await Enterprise.insertMany(splittedJsonArray[i])
    }
    // await Enterprise.insertMany(splittedJsonArray[0])
    console.timeEnd('bulk')

    process.send({
      type : 'process:end',
      data : {
        timer : hrtime(executionTime, 's')
      }
    });
  })
} catch (e) {
  console.log('error sent');
  process.send({
    type : 'process:error',
    data : {
      error : e
    }
  });
}