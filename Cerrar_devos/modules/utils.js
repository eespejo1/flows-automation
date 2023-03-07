const daysToExpire = (untilDate) => {
    const today = new Date();
    const limitDate = new Date(untilDate);

    const msDifference = limitDate.getTime() - today.getTime();
    const daysToExpire = Math.round(msDifference / 86400000);

    return [daysToExpire, limitDate]
}

const timeout = (ms)  => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout'));
      }, ms);
    });
}

const convertDateToText = (date) => {
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
}

module.exports = {
    daysToExpire,
    timeout,
    convertDateToText
}