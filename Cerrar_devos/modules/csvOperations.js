const fs = require('fs')
const csv = require('csv-parser')

const readCsv = async (inputFile) => {
    return new Promise((resolve, reject) => {
        const results = []

        fs.createReadStream(inputFile)
            .pipe(csv())
            .on('data', data => {
                if(data['claimCerrado'] == "" && data['test'] !== 'TRUE' && data['claimId'] != '') {
                    results.push(data)
                }
            })
            .on('end', () => {
               resolve(results)
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}

const writeCsv = (data) => {
    const csv = data.join(',')

    fs.appendFile('data.csv', csv, (err) => {
        if(err) throw err
        console.log('Data appended!')
    })
}

module.exports = {
    readCsv,
    writeCsv
}