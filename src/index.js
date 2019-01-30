class StopWatch {
  constructor(name = '', logger, logLevel = 'info') {
    if (!logger) {
      throw new Error('StopWatch Error: Missing mandatory argument "logger" for StopWatch to use.');
    }
    if (!logger[logLevel]) {
      throw new Error('StopWatch Error: Current logger does not support logLevel "' + logLevel + '".');
    }

    this.name = name;
    this.logger = logger;
    this.logLevel = logLevel;

    try {
      this.logger[this.logLevel](`stopwatch ${this.name} created.`);
    } catch (err) {
      throw new Error('StopWatch Error: logger must have logLevel "' + this.logLevel + '" as a method/function.')
    }
  }

  start() {
    this.prevTime = new Date().valueOf();
    this.logger[this.logLevel](`stopwatch ${this.name} started.`)
  }

  lap(message) {
    const currTime = new Date().valueOf();
    const lapTime = currTime - this.prevTime;
    this.prevTime = currTime;
    this.logger[this.logLevel](`stopwatch ${this.name} ${lapTime} ms from previous checkpoint, with message: ${message}`)
  }
}

module.exports = {
  StopWatch,
};
