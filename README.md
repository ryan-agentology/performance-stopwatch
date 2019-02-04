# Performance Stopwatch

A simple tool to help detect performance bottlenecks during code execution. Especially useful when doing complex processing of large datasets in the backend.

# Installation

```sh
$ npm install --save performance-stopwatch
```

or

```sh
$ yarn add performance-stopwatch
```

# Simple Usage

```js
const Stopwatch = 'performance-stopwatch';
const sw = new Stopwatch();

sw.start();   // -- (1)
sw.lap();     // -- (2)
sw.lap();     // -- (3)
sw.total();   // -- (4)
```

This will output:
```sh
stopwatch started
100 ms from previous checkpoint
20000 ms from previous checkpoint
20100 ms since start
```
In the above scenario,
- 100 ms will be the time taken between (1) and (2)
- 20000 ms will be the time taken between (2) and (3)
- 20100 ms will be the time taken since the stopwatch started, which is between (1) and (4)

# Advanced Usage

The above setup is straightforward, but has 2 limitations:
1. There is no way to easily correlate each printed log with the point in code when this happens
2. It defaults to the use of console.log to print to stdout, which has restrictive logging capabilities

Extra capabilities are presented to deal with the above 2 problems.

## Checkpoint messages - Tackling problem (1)

Add a checkpoint message to each call to any function of stopwatch.

```js
const Stopwatch = 'performance-stopwatch';
const sw = new Stopwatch();

sw.start('start of func');
sw.lap('after loop');
sw.lap('after database calls');
sw.total('end of func');
```

This will output:
```sh
start of func - stopwatch started
after loop - 100 ms from previous checkpoint
after database calls - 20000 ms from previous checkpoint
end of func - 20100 ms since start
```

## Custom logger function - Tackling problem (2)

When initialising, simply include a logger-related function that will be called instead of console.log.

```js
const logger = './utils/logger';
const Stopwatch = 'performance-stopwatch';
const sw = new Stopwatch({
  loggerFunc: logger.info,
});

// use the stopwatch
```

Note: we pass in the function that will be called, instead of the logger itself. This allows us to maximise flexibility on your end by being agnostic about how you choose to implement logging.
