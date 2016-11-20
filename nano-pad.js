"use strict";
const EventEmitter = require("eventemitter2").EventEmitter2;
const midi = require("midi");

class NanoPad extends EventEmitter {
  constructor() {
    super();
    this.input = new midi.input();
  }

  start() {
    this.input.getPortCount();
    this.input.getPortName(0);

    this.input.on("message", (deltaTime, message) => {
      const button = {
        state: getState(message[0]),
        type: getType(message[1]),
        scene: getScene(message[1]),
      };

      this.emit("event", deltaTime, button);
    });

    this.input.openPort(0);
    this.input.ignoreTypes(false, false, false);
  }

  stop() {
    this.input.closePort();
  }

}

module.exports = NanoPad;

function getState(value) {
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

function getType(value) {
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

function getScene(value) {
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
