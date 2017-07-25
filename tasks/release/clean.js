import {fork} from 'child_process'
import {join} from 'path'

const CLEAN_SCRIPT = join(__dirname, '../../scripts/clean.js')

function clean(...$arguments) {
  return () => new Promise(($resolve, $reject) => {
    let _hadCallback = false

    try {
      fork(CLEAN_SCRIPT, $arguments)
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
            $reject(new Error(`clean script exited with code ${$code}`))
          }
        })
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  clean,
  clean as default
}
