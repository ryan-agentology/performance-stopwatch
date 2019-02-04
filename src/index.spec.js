const assert = require('assert');
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const { Stopwatch } = require('./index');

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
    const sw = new Stopwatch()

    sw.start()
    assert(consoleSpy.callCount, 1)
    assert(consoleSpy.calledWith('stopwatch started'), true)

    sw.lap()
    sw.lap()
    assert(consoleSpy.callCount, 3)

    sw.total()
    assert(consoleSpy.callCount, 4)
  })

  it ('# should successfully print out checkpoints', () => {
    const sw = new Stopwatch({
      id: 'some-test-id'
    });

    sw.start('checkpoint-1')
    assert(consoleSpy.callCount, 1)
    assert(consoleSpy.calledWith('checkpoint-1 - stopwatch started'), true)

    sw.lap('checkpoint-2')
    sw.lap('checkpoint-3')
    assert(consoleSpy.callCount, 3)

    sw.total('checkpoint-4')
    assert(consoleSpy.callCount, 4)
  })

  it ('# should successfully use loggerFunc option if present', () => {
    const sw = new Stopwatch({
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
    const sw = new Stopwatch({
      loggerFunc: logger,
    });

    sw.start()
    assert(consoleErrorSpy.callCount, 1)
    assert(logger.info.callCount == 0, true)
  })
})
