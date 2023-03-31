const mainData = require('./modules/mainData.js')
const {readCsv, writeCsv} = require('./modules/csvOperations.js')

const verifyPrevState = async () => {

    try {
        const csv = await readCsv('./inputData.csv');        
        for (const element of csv) {
          try {
            const data = await mainData(element.orderId);
            await writeCsv(data);
          } catch(error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
}
verifyPrevState()    
