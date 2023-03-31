const {timeout} = require('./utils.js')

const getClaimObj = async (claimId) => {
    try {
        const response = await Promise.race([
            fetch(`https://internal-api.mercadolibre.com/v1/claims/${claimId}?caller.scopes=admin`), 
            timeout(5000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getReturnStateObj = async (claimId) => {
    try {
        const response = await Promise.race([
            fetch(`https://post-purchase-core.melioffice.com/v1/claims/${claimId}/state?client.id=123131231231231&caller.scopes=admin`, {
                method: 'GET',
                headers: {
                    'Cookie': 'JSESSIONID=1661B3CCE353CB262B9C830D7F4EF6F9'
                  }
            }),
            timeout(10000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getReturnHistoryObj = async (claimId) => {
    try {
        const response = await Promise.race([
            fetch(`http://internal-api.mercadolibre.com/v1/claims/${claimId}/state_history?client.id=1000000000001&caller.scopes=admin`, {
                method: 'GET',
            }),
            timeout(10000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getOrderObj = async (orderId) => {
    try {
        const response = await Promise.race([
            fetch(`https://internal-api.mercadolibre.com/internal/orders/${orderId}`),
            timeout(5000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getReturnObj = async (claimId) => {
    try {
        const response = await Promise.race([
            fetch(`https://internal-api.mercadolibre.com/post-purchase/returns/search?claim_id=${claimId}`),
            timeout(5000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getBppObject = async (orderId) => {
    try {
        const response = await Promise.race([
            fetch(`https://internal-api.mercadolibre.com/purchase_protection/evaluate?entity_type=order&entity_id=${orderId}`),
            timeout(5000)
        ])
        const data = await response.json()
        return data;
    } catch(error) {
        console.log(error);
    }
}

const postCloseClaim = async (claimId, buyerId) => {
    try {
        const response = await Promise.race([
            fetch(`https://internal-api.mercadolibre.com/v1/claims/${claimId}/actions/close_claim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Caller-Id' : `${buyerId}`
                },
                body: JSON.stringify({
                    'reason': 'return_cancelled'
                })
            }),
            timeout(5000)
        ])

        const data = await response.json()
        return response.status;

    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getClaimObj, 
    getOrderObj, 
    getReturnObj, 
    getReturnStateObj, 
    getBppObject,
    postCloseClaim,
    getReturnHistoryObj
}