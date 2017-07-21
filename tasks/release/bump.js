import {exec} from 'child_process'

function bump($version = 'patch') {
  return () => new Promise(($resolve, $reject) => {
    exec(`npm version --no-git-tag-version ${$version}`, $error => {
      if ($error === null) {
        $resolve()
      } else {
        $reject($error)
      }
    })
  })
}

export {
  bump,
  bump as default
}
