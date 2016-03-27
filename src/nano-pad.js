import { EventEmitter2 } from "eventemitter2";
import midi from "midi";

export default class NanoPad extends EventEmitter2 {
  constructor() {
    super();
    this.input = new midi.input();
  }

  start()  {
    this.input.getPortCount();
    this.input.getPortName(0);

    this.input.on("message", (deltaTime, message) => {
      const button = {
        state: this.getState(message[0]),
        type: this.getType(message[1]),
        scene: this.getScene(message[1]),
        pressure: message[2],
      };
      this.emit("message", deltaTime, button);
    });

    this.input.openPort(0);
    this.input.ignoreTypes(false, false, false);
  }

  stop() {
    this.input.closePort();
  }

  getState(value) {
    if (value === 144) {
      return "press";
    }

    if (value === 128) {
      return "leave";
    }

    if (value === 240) {
      return "change";
    }
    return "none";
  }

  getType(value) {
    if (value === 37 || value === 53 || value === 69 || value === 85) {
      return "C / Chromatic";
    }

    if (value === 39 || value === 55 || value === 71 || value === 87) {
      return "C# / Major1";
    }

    if(value === 66) {
      return "scene";
    }
    return "none";
  }

  getScene(value) {
    if (value === 37 || value === 39) {
      return "1";
    }

    if (value === 53 || value === 55) {
      return "2";
    }

    if (value === 69 || value === 71) {
      return "3";
    }

    if (value === 85 || value === 87) {
      return "4";
    }
    return "none";
  }
}
