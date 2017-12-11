const NanoPad = require("./lib/nano-pad");

module.exports = {
  create
};

function create() {
  return new NanoPad();
}
