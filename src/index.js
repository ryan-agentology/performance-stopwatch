class Stopwatch {
  constructor(options = {}) {
    this.loggerFunc = options.loggerFunc;
  }

  start(checkpoint) {
    this.prevTime = new Date().valueOf();
    this._log(checkpoint, `stopwatch started`)
  }

  lap(checkpoint) {
    if (!this.prevTime) {
      this._log(checkpoint, 'stopwatch not started');
      return;
    }
    const currTime = new Date().valueOf();
    const lapTime = currTime - this.prevTime;
    this.prevTime = currTime;
    this._log(checkpoint, `${lapTime} ms from previous checkpoint`)
    return lapTime
  }

  total(checkpoint) {
    if (!this.prevTime) {
      this._log(checkpoint, 'stopwatch not started');
      return false;
    }
    this._log(checkpoint, `${this.prevTime} ms since start`)
    return this.prevTime
  }

  _log(checkpoint, message) {
    let logString = '';
    if (checkpoint) { logString += `${checkpoint} - ` };
    logString += message

    if (this.loggerFunc) {
      try {
        this.loggerFunc(logString)
      } catch (err) {
        console.error(`loggerFunc options needs to be a function`)
      }
    } else {
      console.log(logString)
    }
  }
}

module.exports = {
  Stopwatch,
};
