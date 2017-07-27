# [sequential-promise-processor][github-url]

[![Travis CI][shield-travis-ci]][travis-ci-url]
[![Latest GitHub Tag][shield-github-tag]][github-tags-url]
[![Node.js Module Version][shield-npm-version]][npm-url]
[![Downloads via npm per Month][shield-npm-downloads]][npm-url]

> A processor that queues and resolves promises in series

## Getting started

### Installation

To install this package to your [Node.js](https://nodejs.org) modules, simply run:
```sh
npm i -S @com.christiangrete.libs.js/sequential-promise-processor
```
Or, using [Yarn](https://yarnpkg.com), run:
```sh
yarn add @com.christiangrete.libs.js/sequential-promise-processor
```

### Usage

Just import it as an ES2015 module and create an instance to get started:
```js
import {
  SequentialPromiseProcessor
} from '@com.christiangrete.libs.js/sequential-promise-processor'

const sequentialPromiseProcessor = new SequentialPromiseProcessor()
```
This class is also available as the `default` member, so you don’t need to explicitly import it as a named member.

The whole package is distributed using the [UMD](https://github.com/umdjs/umd) pattern.

## Example

Let’s assume that we want to execute `git` commands in a series:
```js
import {
  SequentialPromiseProcessor
} from '@com.christiangrete.libs.js/sequential-promise-processor'

import {exec} from 'child_process'

// A factory function that returns another function which will be passed to the
// Promise constructor as its executor function with the corresponding command
const createExecutor = $command => ($resolve, $reject) => {
  exec($command, ($error, $stdout, $stderr) => {
    if ($error === null) {
      $resolve($stdout)
    } else {
      $reject($error, $stderr)
    }
  })
}

// Another factory function that returns a new Promise object created with the
// corresponding command and the executor function from the factory above
const createFactory = ($command, $callback) => () => {
  const _executor = createExecutor($command)
  const _promise = new Promise(_executor)

  if (typeof $callback === 'function') {
    _promise.then(
      $stdout => $callback(null, $stdout),
      ($error, $stderr) => $callback($error, $stderr)
    )
  }

  return _promise
}

// A list of commands that will be executed in series
const commands = [
  'git add --all',
  'git status',
  "git commit -m 'fix stuff'",
  'git pull origin develop',
  'git push origin develop'
]

// A list of factory functions referenced with the corresponding command from
// the list above
const factories = commands.map($command => createFactory(
  $command,
  (...$arguments) => console.log(...$arguments)
))

const sequentialPromiseProcessor = new SequentialPromiseProcessor()

// This method adds all factory functions to the queue...
sequentialPromiseProcessor.queue(factories) // Queues the factories from above
// ...it could also be used as follows:
// sequentialPromiseProcessor.queue(...factories)
// ...or...
// sequentialPromiseProcessor.queue(factories[0]).queue(factories[1])

// Start processing the queue needs to be done manually.
sequentialPromiseProcessor.process()

// It is possible to remove a factory from the queue, unless it has already
// been processed.
sequentialPromiseProcessor.unqueue(factories[1])

// It is also possible to pause the processing of the queue...
sequentialPromiseProcessor.pause()

// ...and to resume it later on...
setTimeout(() => {
  sequentialPromiseProcessor.resume()
}, 500)

// ...or completely abort the process.
sequentialPromiseProcessor.cancel()
```

## Policy

This is communist software. It is crafted with heart and soul to the best of the authors’ knowledge and belief: _Not for profit but to satisfy the concrete needs._ Do whatever you want with it (as long as you keep the authors’ copyright notices in all copies or substantial portions of it included) for free. Imagine how the world could be if others would produce and distribute their products for the same benefits and ask yourself why they’re actually not.

## Contributing

You’re more than welcome to contribute to the source code of this project. See the [contribution guidelines](CONTRIBUTING.md) on how to get involved.

Also, have a look at the [to-do list](TODO.md).

## License

This software is licensed under [MIT License](LICENSE.md).

Copyright © 2017 [Christian Grete](https://christiangrete.com)
- [GitHub](https://github.com/ChristianGrete)
- [npm](https://www.npmjs.com/~christiangrete)
- [Twitter](https://twitter.com/ChristianGrete)
- [LinkedIn](https://www.linkedin.com/in/ChristianGrete)
- [XING](https://www.xing.com/profile/Christian_Grete2)

[github-tags-url]: https://github.com/ChristianGrete/sequential-promise-processor/tags
[github-url]: https://github.com/ChristianGrete/sequential-promise-processor
[npm-url]: https://www.npmjs.com/package/@com.christiangrete.libs.js/sequential-promise-processor
[shield-github-tag]: https://img.shields.io/github/tag/ChristianGrete/sequential-promise-processor.svg
[shield-npm-downloads]: https://img.shields.io/npm/dm/@com.christiangrete.libs.js/sequential-promise-processor.svg
[shield-npm-version]: https://img.shields.io/npm/v/@com.christiangrete.libs.js/sequential-promise-processor.svg
[shield-travis-ci]: https://img.shields.io/travis/ChristianGrete/sequential-promise-processor.svg
[travis-ci-url]: https://travis-ci.org/ChristianGrete/sequential-promise-processor