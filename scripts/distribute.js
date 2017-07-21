import SequentialPromiseProcessor from '../src'
import {build, bump, clean, finish, release, undo} from '../tasks/release'

var commit

const TASKS = Object.freeze([
  clean(),
  bump(),
  build($commit => {
    commit = $commit
  }),
  release(),
  undo(() => commit),
  clean('distribution'),
  finish()
])

;(new SequentialPromiseProcessor(TASKS)).process()
