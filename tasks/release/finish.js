import {exec} from 'child_process'

function finish() {
  return () => new Promise(($resolve, $reject) => {
    try {
      exec(
        'git push --force origin master && git checkout develop',
        $error => {
          if ($error === null) {
            $resolve()
          } else {
            $reject($error)
          }
        }
      )
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  finish as default,
  finish
}
