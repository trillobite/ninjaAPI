

const StringUtils = {
  stripNewLines: (string) => {
    return string.replace(/(\r\n|\n|\r)/gm," ");
  }

}

module.exports = StringUtils;