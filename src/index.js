import midi from "midi";

import NanoPad from "./nano-pad";

const nanopad = new NanoPad();

nanopad.on("message", (deltaTime, message) => {
  console.log(`m: ${JSON.stringify(message)} d: ${deltaTime}`);
});

nanopad.start();
