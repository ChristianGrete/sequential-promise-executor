import {exec} from 'child_process'

function build() {
  return () => new Promise(($resolve, $reject) => {
    exec('webpack -p', $error => {
      if ($error === null) {
        $resolve()
      } else {
        $reject($error)
      }
    })
  })
}

export {
  build,
  build as default
}
