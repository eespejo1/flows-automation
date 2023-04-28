const mainData = require('./modules/mainDataCreation.js')
const {readCsv, writeCsv} = require('./modules/csvOperations.js')
const {postCloseClaim} = require('./modules/https.js')
const {convertDateToText} = require('./modules/utils.js')
const {claimStateValidation, hasAReturnValidation} = require('./modules/validations.js')



const closeClaim = async () => {
    try {
        const csv = await readCsv('./inputData.csv');  

        for (const element of csv) {
            const claimId = element.claimId
            const claimData = ['', claimId, '', '', '', '\n']

            try {
                const data = await mainData(claimId)
        
                claimData[0] = data.orderId
                claimData[2] = data.buyerId
                claimData[3] = convertDateToText(data.untilDate)
        
                if (claimStateValidation(data.nameState, claimData) 
                    && !hasAReturnValidation(data.hasAReturn, claimData)) {
        
                    console.log("close claim")
                    // Close claim
                    try {
                        const responseStatus = await postCloseClaim(claimId, data.buyerId)
                        responseStatus == 201 ? claimData[4] = 'Done' : console.log("Failed to close claim.")
        
                    } catch(error){
                        console.log(error)
                    }
                }
                writeCsv(claimData)
            } catch(error) {
                console.log(error)
            }

        }
    } catch (error) {
    console.log(error);
  }
    
}

closeClaim()