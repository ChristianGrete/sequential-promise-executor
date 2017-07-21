import SequentialPromiseProcessor from '../src/'
import {build, bump, clean, prepublish, publish} from '../tasks/release/'

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
  // clean(),
  // bump(version),
  // TODO: git.add('--all'),
  // TODO: git.commit(`bump(version): ${version} [ci skip]`),
  // TODO: git.push(),
  // TODO: git.checkout('master'),
  // TODO: git.merge('develop'),
  // TODO: currentCommitHash = git.revParse('--verify HEAD'),
  // build(),
  // TODO: git.add('--all'),
  // TODO: git.commit(`release(artifact): ${version} [ci skip]`),
  // TODO: git.forcePush(),
  // TODO: git.tag(`v${version}`, 'Lorem ipsum dolor'),
  // TODO: git.pushTags(),
  // prepublish(),
  // publish(),
  // TODO: git.hardReset(currentCommitHash),
  clean('artifact')
  // TODO: git.forcePush(),
  // TODO: git.checkout('develop')
])

;(new SequentialPromiseProcessor(TASKS)).process()
