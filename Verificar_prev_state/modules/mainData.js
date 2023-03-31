const {getOrderObj, getReturnObj, getReturnStateObj, getBppObject, getReturnHistoryObj} = require('./https')

const mainData = async (orderId) => {
    try {
        const orderData = await getOrderObj(orderId)
        const orderClaims = []
        orderData.mediations.forEach(element => {
            orderClaims.push(element.id)
        });

        const claimWithoutReturn = await getReturnObjMethod(orderClaims)
        console.log(claimWithoutReturn)

        let result = []

        if (claimWithoutReturn.length > 0) {
            for (const claim of claimWithoutReturn) {
                try {
                    const returnHistory = await getReturnHistoryObj(claim)
                    const currentState = returnHistory[0].name
                    const prevState = returnHistory[0].previous_state.name
                    result.push({claim, current_state: currentState, prev_state: prevState})
                } catch (error) {
                    console.log(`Error obteniendo el historial de devoluciones para la reclamación ${claim}: ${error.message}`)
                }
            }
        } 

        const data = [
            orderId,
            JSON.stringify(result) + "\n"
        ]

        return data;
    } catch(error) {
        console.log(error);
    }
}

const getReturnObjMethod = async (orderClaims) => {
    const returnObjs = await Promise.all(orderClaims.map(async claim => {
        const returnObj = await getReturnObj(claim)
        const dataLength = returnObj.data.length
        if (dataLength == 0) {
            return claim
        }
    }))
    
    return returnObjs.filter(val => val !== undefined)
}



module.exports = mainData