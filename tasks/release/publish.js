import {exec} from 'child_process'

function publish() {
  return () => new Promise(($resolve, $reject) => {
    exec(`npm publish --access public`, $error => {
      if ($error === null) {
        $resolve()
      } else {
        $reject($error)
      }
    })
  })
}

export {
  publish,
  publish as default
}
