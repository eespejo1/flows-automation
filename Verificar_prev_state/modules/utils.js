const timeout = (ms)  => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Timeout'));
      }, ms);
    });
}

module.exports = {
    timeout
}