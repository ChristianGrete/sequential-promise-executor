import {exec} from 'child_process'

function undo($getCommit) {
  return () => new Promise(($resolve, $reject) => {
    const _COMMIT = $getCommit()

    try {
      exec(`git reset --hard ${_COMMIT}`, $error => {
        if ($error === null) {
          $resolve()
        } else {
          $reject($error)
        }
      })
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  undo as default,
  undo
}
