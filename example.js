const nanopad = require("./index");

const n = nanopad.create();

n.on("event", (deltaTime, button) => {
  console.log(`${JSON.stringify(button)} - ${deltaTime}`);
});

n.start();
