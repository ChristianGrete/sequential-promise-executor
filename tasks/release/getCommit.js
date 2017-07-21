import {exec} from 'child_process'

function getCommit($callback) {
  return () => new Promise(($resolve, $reject) => {
    exec('git rev-parse --verify HEAD', ($error, $stdout) => {
      if ($error === null) {
        try {
          $callback($stdout)
        } catch ($error) {
          return $reject($error)
        }

        $resolve()
      } else {
        $reject($error)
      }
    })
  })
}

export {
  getCommit,
  getCommit as default
}
