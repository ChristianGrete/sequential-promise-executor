import {readFile, writeFile} from 'fs'
import {join} from 'path'

const FILE = join(__dirname, '../../package.json')

function prepublish() {
  return () => new Promise(($resolve, $reject) => {
    readFile(FILE, 'utf8', ($error, $json) => {
      var _json
      var _package

      if ($error === null) {
        try {
          _package = JSON.parse($json)
        } catch ($error) {
          return $reject($error)
        }

        ['devDependencies', 'scripts'].forEach($key => {
          if (_package[$key] != null) {
            _package[$key] = null
          }

          delete _package[$key]
        })

        if (_package.private) {
          _package.private = false
        }

        try {
          _json = JSON.stringify(_package, null, 2)
        } catch ($error) {
          return $reject($error)
        }

        writeFile(FILE, _json, 'utf8', $error => {
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
  })
}

export {
  prepublish,
  prepublish as default
}
