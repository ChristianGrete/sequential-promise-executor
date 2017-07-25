import SequentialPromiseProcessor from '../src'
import {build, bump, clean, finish, release, undo} from '../tasks/release'

var commit
var version

const TASKS = Object.freeze([
  clean(),
  bump($version => {
    version = $version
  }),
  build(() => version, $commit => {
    commit = $commit
  }),
  release(() => version),
  undo(() => commit),
  clean('distribution'),
  finish(() => version)
])

;(new SequentialPromiseProcessor(TASKS)).process()
