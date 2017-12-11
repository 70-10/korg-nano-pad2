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
        scene: getScene(message[1])
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
  if (value === 128) {
    return "leave";
  }

  if (value === 144) {
    return "press";
  }

  if (value === 176) {
    return "move";
  }

  if (value === 240) {
    return "change";
  }
  return "none";
}

function getType(value) {
  switch (value) {
    case 1:
      return "start";
    case 2:
      return "stop";
    case 16:
      return "leave";
  }

  if ((value - 20) % 16 === 0) {
    return "C# / User";
  }
  if ((value - 21) % 16 === 0) {
    return "C / Chromatic";
  }
  if ((value - 22) % 16 === 0) {
    return "A / minor1";
  }
  if ((value - 23) % 16 === 0) {
    return "C# / Major1";
  }
  if ((value - 24) % 16 === 0) {
    return "A# / minor2";
  }
  if ((value - 25) % 16 === 0) {
    return "D / Major2";
  }
  if ((value - 26) % 16 === 0) {
    return "B / m.Penta";
  }
  if ((value - 27) % 16 === 0) {
    return "D# / M.Penta";
  }
  if ((value - 28) % 16 === 0) {
    return "Range - / m.Blues";
  }
  if ((value - 29) % 16 === 0) {
    return "E / M.Blues";
  }
  if ((value - 30) % 16 === 0) {
    return "Range + / Raga";
  }
  if ((value - 31) % 16 === 0) {
    return "F / Bass Line";
  }
  if ((value - 32) % 16 === 0) {
    return "Oct - / Ryukyu";
  }
  if ((value - 33) % 16 === 0) {
    return "F# / China";
  }
  if ((value - 34) % 16 === 0) {
    return "Oct + / 5th";
  }
  if ((value - 35) % 16 === 0) {
    return "G / 4th";
  }

  if (value === 66) {
    return "scene";
  }

  return "none";
}

function getScene(value) {
  if (value >= 36 && value <= 51) {
    return 1;
  }
  if (value >= 52 && value <= 67) {
    return 2;
  }
  if (value >= 68 && value <= 83) {
    return 3;
  }
  if (value >= 84 && value <= 99) {
    return 4;
  }

  return 0;
}
