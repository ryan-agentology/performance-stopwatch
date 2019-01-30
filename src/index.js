class StopWatch {
  constructor(name, logger, logLevel = 'info') {
    if (!logger) {
      throw new Error('Please pass in a logger for StopWatch to use.');
    }
    if (!logger[logLevel]) {
      throw new Error('Current logger in StopWatch does not support logLevel: ' + logLevel + '.');
    }

    this.name = name;
    this.logger = logger;
    this.logLevel = logLevel;

    try {
      this.logger[this.logLevel](`stopwatch ${this.name} created.`);
    } catch (err) {
      throw new Error(logLevel + ' must be a method/function of the logger passed into StopWatch.')
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

module.exports =  {
  StopWatch,
};
