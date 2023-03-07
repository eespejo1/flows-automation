const mainData = require('./modules/mainDataCreation.js')
const {writeCsv} = require('./modules/csvOperations.js')
const {postCloseClaim} = require('./modules/https.js')
const {convertDateToText} = require('./modules/utils.js')
const {claimStateValidation, hasAReturnValidation, hasDaysToExpire} = require('./modules/validations.js')

const claimId = 5177982168 // Write the claim Id as an integer

const claimData = [
    claimId,
    '',
    '',
    '',
    '\n'
]

const closeClaim = async (claimId) => {
    try {
        const data = await mainData(claimId)
        console.log(data)

        claimData[1] = convertDateToText(data.untilDate)

        if (claimStateValidation(data.nameState, claimData) 
            && !hasAReturnValidation(data.hasAReturn, claimData) 
            && hasDaysToExpire(data.hasDaysToExpire, claimData)) {

            console.log(data.hasDaysToExpire, "close claim")
            // Close claim
            try {
                const responseStatus = await postCloseClaim(claimId, data.buyerId)
                responseStatus == 201 ? claimData[3] = 'E Done' : console.log("Failed to close claim.")

            } catch(error){
                console.log(error)
            }
        }
        writeCsv(claimData)
    } catch(error) {
        console.log(error)
    }
}

closeClaim(claimId)