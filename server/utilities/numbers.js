

const NumberUtils = {
  convertToCurrencyString: (number) => {
    return "$" + (Math.round((number * 100)) / 100).toFixed(2);
  }
}

module.exports = NumberUtils;