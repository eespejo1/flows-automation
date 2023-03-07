const {getClaimObj, getOrderObj, getReturnObj, getReturnStateObj, getBppObject} = require('./https')
const { daysToExpire } = require('./utils')

const mainData = async (claimId) => {
    //console.log(claimId)
    try {
        // claim data
        //console.log(claimId)
        const claimData = await getClaimObj(claimId)
        const orderId = claimData.resource_id
        //console.log(orderId)

        // return state data
        const returnStateData = await getReturnStateObj(claimId)
        const nameState = returnStateData.name
        //console.log(nameState)

        // order data
        const orderData = await getOrderObj(orderId)
        const buyerId = orderData.buyer.id
        //console.log(buyerId)

        // return data
        const returnData = await getReturnObj(claimId)
        const hasAReturn = returnData.data.length > 0
        //console.log(hasAReturn)

        // bpp data
        const bppData = await getBppObject(orderId)
        const untilDate = bppData.delivered_policy.protected_until_date
        const hasDaysToExpire = daysToExpire(untilDate)[0] != undefined && daysToExpire(untilDate)[0] > 5
        //console.log(daysToExpire(untilDate)[0])

        const mainDataObj = {
            claimId,
            orderId,
            nameState,
            buyerId,
            hasAReturn,
            hasDaysToExpire,
            daysToExpire: daysToExpire(untilDate)[0],
            untilDate: daysToExpire(untilDate)[1]
        }

        return mainDataObj
    } catch(error) {
        console.log(error);
    }
}

module.exports = mainData