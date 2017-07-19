# [sequential-promise-processor][github-url]

[![Latest GitHub Tag][shield-github-tag]][github-tags-url]

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
```js
import {exec} from 'child_process'

import {
  SequentialPromiseProcessor
} from '@com.christiangrete.libs.js/sequential-promise-processor'

const createExecutor = $command => ($resolve, $reject) => {
  exec($command, ($error, $stdout, $stderr) => {
    if ($error === null) {
      $resolve($stdout)
    } else {
      $reject($error, $stderr)
    }
  })
}

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

const commands = [
  'git add --all',
  'git status',
  "git commit -m 'fix stuff'",
  'git pull origin develop',
  'git push origin develop'
]

const factories = commands.map($command => createFactory(
  $command,
  (...$arguments) => console.log(...$arguments)
))

const sequentialPromiseProcessor = new SequentialPromiseProcessor()

sequentialPromiseProcessor.queue(factories)

sequentialPromiseProcessor.process()

sequentialPromiseProcessor.unqueue(factories[1])

sequentialPromiseProcessor.pause()

setTimeout(() => {
  sequentialPromiseProcessor.resume()
}, 500)

sequentialPromiseProcessor.cancel()
```

## Policy

This is communist software. It is crafted with heart and soul to the best of the authors’ knowledge and belief: _Not for profit but to satisfy the concrete needs._ Do whatever you want with it (as long as you keep the authors’ copyright notices in all copies or substantial portions of it included) for free. Imagine how the world could be if others would produce and distribute their products for the same benefits and ask yourself why they’re actually not.

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
[npm-badge]: https://nodei.co/npm/sequential-promise-processor
[package-quality-url]: http://packagequality.com/#?package=sequential-promise-processor
[shield-github-tag]: https://img.shields.io/github/tag/ChristianGrete/sequential-promise-processor.svg
[shield-package-quality]: http://npm.packagequality.com/shield/sequential-promise-processor.svg
