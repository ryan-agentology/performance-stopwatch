# Performance Stopwatch

A simple tool to help detect performance bottlenecks during code execution. Especially useful when doing complex processing of large datasets in the backend.

# Usage

```sh
$ npm install --save performance-stopwatch
```

```js
// index.js

const logger = './utils/logger';
const StopWatch = 'performance-stopwatch';

function foo() {
  const sw = new StopWatch('fooWatch', logger, 'debug');
  sw.start();                         // -- (1)

  /* do something */

  sw.lap('after loop');               // -- (2)

  /* do more things */

  sw.lap('after database calls');     // -- (3)
}
```

This will output
```sh
$ node index.js
stopwatch fooWatch created.
stopwatch fooWatch started.
stopwatch fooWatch 100 ms from previous checkpoint, with message: after loop
stopwatch fooWatch 20000 ms from previous checkpoint, with message: after database calls
```

In the above scenario, it is likely that the interval between (2) and (3) might be optimisable.
