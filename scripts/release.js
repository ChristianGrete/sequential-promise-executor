import SequentialPromiseProcessor from '../src/'
import {build, bump, clean} from '../tasks/release/'

var version = 'patch'

const ARGUMENTS = Object.freeze(process.argv.slice(2))

const versions = /^(m(aj|in)or|p(atch|re(m(aj|in)or|patch|release)))$/

ARGUMENTS.every($argument => {
  if (versions.test($argument)) {
    version = $argument
    return false
  }
})

const TASKS = Object.freeze([
  clean(),
  bump(version),
  // TODO ...
  // git.add('--all'),
  // git.commit(`bump(version): ${version} [ci skip]`),
  // git.push(),
  // git.checkout('master'),
  // git.merge('develop'),
  // currentCommitHash = git.revParse('--verify HEAD'),
  build(),
  // TODO ...
  // git.add('--all'),
  // git.commit(`release(artifact): ${version} [ci skip]`),
  // git.forcePush(),
  // git.tag(`v${version}`, 'Lorem ipsum dolor'),
  // git.pushTags(),
  // optimizeManifests(),
  // publish(),
  // git.hardReset(currentCommitHash),
  clean('--artifact')
  // TODO ...
  // git.forcePush(),
  // git.checkout('develop')
])

;(new SequentialPromiseProcessor(TASKS)).process()
