import SequentialPromiseProcessor from '../src/'
import * as tasks from '../tasks/release/'

const TASKS = Object.freeze([
  tasks.clean(),
  tasks.bump(),
  // TODO: git.add('--all'),
  // TODO: git.commit(`bump(version): ${version} [ci skip]`),
  // TODO: git.push(),
  // TODO: git.checkout('master'),
  // TODO: git.merge('develop'),
  // TODO: currentCommitHash = git.revParse('--verify HEAD'),
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
