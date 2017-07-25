import {exec} from 'child_process'
import {readFile, writeFile} from 'fs'
import {join} from 'path'

const MANIFEST_FILE = join(__dirname, '../../package.json')

const messages = /^message=/

let message = ''

process.argv.slice(2).every($argument => {
  if (messages.test($argument)) {
    if (message.length > 0) {
      message += ' '
    }

    message += $argument.replace(messages, '')
    return false
  }
})

const editManifestFile = ($resolve, $reject) => () => {
  readFile(MANIFEST_FILE, 'utf8', ($error, $json) => {
    var _json
    var _package

    if ($error === null) {
      _package = JSON.parse($json)

      ;['devDependencies', 'scripts'].forEach($key => {
        if (_package[$key] != null) {
          _package[$key] = null
        }

        delete _package[$key]
      })

      if (_package.private) {
        _package.private = false
      }

      _json = JSON.stringify(_package, null, 2)

      writeFile(MANIFEST_FILE, _json, 'utf8', $error => {
        if ($error === null) {
          $resolve()
        } else {
          $reject($error)
        }
      })
    } else {
      $reject($error)
    }
  })
}

const run = ($reject, $command, $resolve) => {
  exec($command, $error => {
    if ($error === null) {
      $resolve()
    } else {
      $reject($error)
    }
  })
}

function release($getVersion) {
  return () => new Promise(($resolve, $reject) => {
    const _VERSION = $getVersion()

    const _run = run.bind(this, $reject)

    try {
      _run(
        `git tag -a 'v${_VERSION}' -m '${message}' && git push --tags`,
        editManifestFile(
          () => _run('npm publish --access public', $resolve),
          $reject
        )
      )
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  release as default,
  release
}
