import {exec} from 'child_process'

function finish($getVersion) {
  return () => new Promise(($resolve, $reject) => {
    const _VERSION = $getVersion()

    try {
      exec(
        'git push --force origin master && git checkout develop',
        $error => {
          if ($error === null) {
            // eslint-disable-next-line no-console
            console.log(`Successfully distributed v${_VERSION}`)
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
