const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

const chunkDirectory = './data/chunks'

async function splitcsv() {
  try {
    console.log('inside')
    fs.mkdirSync(chunkDirectory, { recursive: true })
    let response = await csvSplitStream.split(
      fs.createReadStream('./data/Stock.csv'),
      {
        lineLimit: 250000
      },
      (index) => {
        return fs.createWriteStream(`./data/chunks/chunk-${index}.csv`)
      }
    )
    console.log('csvSplitStream succeeded.', response);
  } catch(error) {
    console.log('csvSplitStream failed!', error);
    process.exit()
  }
}

if (fs.existsSync(chunkDirectory)) {
    console.log('There already is a chunks directory. Please remove it before new splitting.')
    process.exit()
}

splitcsv();
