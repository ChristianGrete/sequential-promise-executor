import {exec} from 'child_process'
import {readFile} from 'fs'
import {join} from 'path'

const PACKAGE = join(__dirname, '../../package.json')

const versions = /^(m(aj|in)or|p(atch|re(m(aj|in)or|patch|release)))$/

let version = 'patch'

process.argv.slice(2).every($argument => {
  if (versions.test($argument)) {
    version = $argument
    return false
  }
})

function bump($callback) {
  return () => new Promise(($resolve, $reject) => {
    exec(`npm version --no-git-tag-version ${version}`, $error => {
      if ($error === null) {
        readFile(PACKAGE, 'utf8', ($error, $json) => {
          var _version

          if ($error === null) {
            try {
              $callback(JSON.parse($json).version)
            } catch ($error) {
              return $reject($error)
            }

            $resolve()
          } else {
            $reject($error)
          }
        })
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
