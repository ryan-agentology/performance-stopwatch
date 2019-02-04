const assert = require('assert');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const { StopWatch } = require('./index');

describe('index.spec.js', function () {
  let logger;
  let consoleSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    consoleSpy = sandbox.spy(console, 'log')
    consoleErrorSpy = sandbox.spy(console, 'error')

    logger = {
      info: sandbox.stub()
    }
  })

  afterEach(() => {
    sandbox.restore();
  })

  it ('# should successfully print without any configuration', () => {
    const sw = new StopWatch()

    sw.start()
    assert(consoleSpy.callCount, 1)
    assert(consoleSpy.calledWith('stopwatch started'), true)

    sw.lap()
    sw.lap()
    assert(consoleSpy.callCount, 3)

    sw.total()
    assert(consoleSpy.callCount, 4)
  })

  it ('# should successfully use id option', () => {
    const sw = new StopWatch({
      id: 'some-test-id'
    });

    sw.start()
    assert(consoleSpy.callCount, 1)
    assert(consoleSpy.calledWith('some-test-id - stopwatch started'), true)

    sw.lap()
    sw.lap()
    assert(consoleSpy.callCount, 3)

    sw.total()
    assert(consoleSpy.callCount, 4)
  })

  it ('# should successfully use loggerFunc option if present', () => {
    const sw = new StopWatch({
      loggerFunc: logger.info,
    });

    sw.start()
    assert(consoleSpy.callCount == 0, true)
    assert(logger.info.callCount, 1)

    sw.lap()
    sw.lap()
    assert(consoleSpy.callCount == 0, true)
    assert(logger.info.callCount, 3)

    sw.total()
    assert(consoleSpy.callCount == 0, true)
    assert(logger.info.callCount, 4)
  })

  it ('# should notify if loggerFunc option is not a function', () => {
    const sw = new StopWatch({
      loggerFunc: logger,
    });

    sw.start()
    assert(consoleErrorSpy.callCount, 1)
    assert(logger.info.callCount == 0, true)
  })
})
