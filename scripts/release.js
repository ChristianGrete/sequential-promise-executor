import SequentialPromiseProcessor from '../src'

const TASKS = Object.freeze([
  // TODO ...
  // runCleanScript(),
  // bumpVersion('minor'),
  // git.add('--all'),
  // git.commit(`bump(version): ${version} [ci skip]`),
  // git.push(),
  // git.checkout('master'),
  // git.merge('develop'),
  // currentCommitHash = git.revParse('--verify HEAD'),
  // runWebpack(),
  // git.add('--all'),
  // git.commit(`release(artifact): ${version} [ci skip]`),
  // git.forcePush(),
  // git.tag(`v${version}`, 'Lorem ipsum dolor'),
  // git.pushTags(),
  // optimizeManifests(),
  // publish(),
  // git.hardReset(currentCommitHash),
  // runCleanScript('--artifact'),
  // git.forcePush(),
  // git.checkout('develop')
])

;(new SequentialPromiseProcessor(TASKS)).process()
