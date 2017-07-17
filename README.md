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
import Processor from '@com.christiangrete.libs.js/sequential-promise-processor'

function createPromiseExecutor($command) {
  return function execute($resolve, $reject) {
    exec($command, ($error, $stdout, $stderr) => {
      if ($error === null) {
        $resolve(null, $stdout)
      } else {
        $reject($error, $stderr)
      }
    })
  }
}

function createPromiseFactory($command, $callback) {
  return function createPromise() {
    const _executor = createPromiseExecutor($command)
    const _promise = new Promise(_executor)

    if (typeof $callback === 'function') {
      _promise.then($callback, $callback)
    }

    return _promise
  }
}

const commands = [
  createPromiseFactory('git add --all'),
  createPromiseFactory("git commit -m 'added stuff'"),
  createPromiseFactory('git pull origin develop'),
  createPromiseFactory('git push origin develop', $error => throw $error)
]

const processor = new Processor()

processor.queue(commands)

processor.process()
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
