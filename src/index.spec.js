const assert = require('assert');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const { StopWatch } = require('./index');

describe('index.spec.js', function () {
  let logger;

  beforeEach(() => {
    logger = {
      info: sandbox.stub()
    }
  })

  afterEach(() => {
    sandbox.restore();
  })

  it ('# should successfully lap more than once', () => {
    const sw = new StopWatch('test stopwatch', logger, 'info')

    sw.start()
    assert(logger.info.callCount, 1)
    assert(logger.info.calledWith('stopwatch test stopwatch created.'), true)

    sw.lap()
    sw.lap()
    assert(logger.info.callCount, 3)
  })

  it ('# should throw an error if new StopWatch() does not have a logger', () => {
    let errorFlag = false;
    try {
      const sw = new StopWatch('test stopwatch')
    } catch (err) {
      errorFlag = true
      assert.equal(err.message, 'StopWatch Error: Missing mandatory argument "logger" for StopWatch to use.');
    }
    assert.equal(errorFlag, true)
  })

  it ('# should throw an error if new StopWatch() does not have a working logLevel', () => {
    let errorFlag = false;
    try {
      const sw = new StopWatch('test stopwatch', logger, 'debug')
    } catch (err) {
      errorFlag = true
      assert.equal(err.message, 'StopWatch Error: Current logger does not support logLevel "debug".');
    }
    assert.equal(errorFlag, true)
  })

  it ('# should throw an error if sw.logger.info is not a method/function', () => {
    let errorFlag = false;
    logger.info = 'some-string'
    try {
      const sw = new StopWatch('test stopwatch', logger, 'info')
    } catch (err) {
      errorFlag = true
      assert.equal(err.message, 'StopWatch Error: logger must have logLevel "info" as a method/function.');
    }
    assert.equal(errorFlag, true)
  })
})
