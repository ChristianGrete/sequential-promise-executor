import {exec} from 'child_process'

var version = 'patch'

const versions = /^(m(aj|in)or|p(atch|re(m(aj|in)or|patch|release)))$/

process.argv.slice(2).every($argument => {
  if (versions.test($argument)) {
    version = $argument
    return false
  }
})

function bump() {
  return () => new Promise(($resolve, $reject) => {
    exec(`npm version --no-git-tag-version ${version}`, $error => {
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
