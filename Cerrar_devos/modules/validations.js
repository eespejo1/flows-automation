const claimStateValidation = (nameState, claimData) => {
    switch (nameState) {
        case "return_allowed":
        case "return_pending":
            return true;
        default:
            console.log('claim State different to return_allowed or return_pending\n')
            claimData[4] = 'claim State different to return_allowed or return_pending\n';
            return false;
    }
}

const hasAReturnValidation = (hasAReturn, claimData) => {
    if (hasAReturn) {
        console.log('this claim has already a return\n')
        claimData[4] = 'this claim has already a return\n';
    }
    return hasAReturn
}

const hasDaysToExpire = (hasDaysToExpire, claimData) => {
    if (!hasDaysToExpire) {
        console.log('bpp is not enough\n')
        claimData[4] = 'bpp is not enough\n'
    }

    return hasDaysToExpire
}

module.exports = {
    claimStateValidation,
    hasAReturnValidation,
    hasDaysToExpire
}