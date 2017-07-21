import SequentialPromiseProcessor from '../src/'
import * as tasks from '../tasks/release/'

var commit
var version

const TASKS = Object.freeze([
  // tasks.bump($version => {
  //   version = $version
  // }),
  tasks.getCommit($commit => {
    commit = $commit
  }),
  tasks.build(),
  // TODO: git.add('--all'),
  // TODO: git.commit(`release(artifact): ${version} [ci skip]`),
  // TODO: git.forcePush(),
  // TODO: git.tag(`v${version}`, 'Lorem ipsum dolor'),
  // TODO: git.pushTags(),
  // tasks.prepublish(),
  // tasks.publish(),
  // TODO: git.hardReset(currentCommitHash),
  tasks.clean('artifact')
  // TODO: git.forcePush(),
  // TODO: git.checkout('develop')
])

;(new SequentialPromiseProcessor(TASKS)).process()
