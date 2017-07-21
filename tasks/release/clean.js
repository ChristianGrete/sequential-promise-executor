import {fork} from 'child_process'
import {join} from 'path'

function clean(...$arguments) {
  return () => new Promise(($resolve, $reject) => {
    var _hadCallback = false

    fork(join(__dirname, '../../scripts/clean.js'), $arguments)
      .on('error', $error => {
        if (_hadCallback) {
          return
        }

        _hadCallback = true

        $reject($error)
      })
      .on('exit', $code => {
        if (_hadCallback) {
          return
        }

        _hadCallback = true

        if ($code === 0) {
          $resolve()
        } else {
          $reject(new Error(`Clean script exited with code ${$code}`))
        }
      })
  })
}

export {
  clean,
  clean as default
}
