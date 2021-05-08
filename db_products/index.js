const transform = {
  features : function(inputRow) {
    if (inputRow.find(',') > 3) {
      let position = inputRow.lastIndexOf(',');
      return inputRow.slice(0, position) + inputRow.slice(position + 1);
    }
  }
}

module.exports = transform;