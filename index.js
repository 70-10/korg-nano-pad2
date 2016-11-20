const NanoPad = require("./nano-pad");

module.exports = {
  create
};

function create() {
  return new NanoPad();
}
