import {existsSync} from 'fs'
import {relative, resolve} from 'path'
import rimraf from 'rimraf'

const ARGUMENTS = Object.freeze(process.argv.slice(2))
const ROOT_DIRECTORY = resolve(__dirname, '..')

const hasArgument = $argument => ARGUMENTS.includes($argument)

const entries = [
  'build/',
  'coverage/',
  'docs/'
]

if (hasArgument('all') || hasArgument('dependencies')) {
  entries.push(
    'node_modules/',
    'package-lock.json',
    'yarn.lock'
  )
}

if (hasArgument('all') || hasArgument('distribution')) {
  entries.push('dist/')
}

(function clean($entries) {
  $entries.forEach($entry => {
    $entry = resolve(ROOT_DIRECTORY, $entry)

    if (existsSync($entry)) {
      rimraf($entry, () => {
        $entry = relative(ROOT_DIRECTORY, $entry)

        console.info(`Removed ${$entry}`) // eslint-disable-line no-console
      })
    }
  })
})(entries)
