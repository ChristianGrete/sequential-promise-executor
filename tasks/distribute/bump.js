import {exec} from 'child_process'

const versions = /^(m(aj|in)or|p(atch|re(m(aj|in)or|patch|release)))$/

let version = 'patch'

process.argv.slice(2).every($argument => {
  if (versions.test($argument)) {
    version = $argument
    return false
  }
})

const run = ($reject, $command, $resolve) => {
  exec($command, ($error, $stdout) => {
    if ($error === null) {
      $resolve($stdout)
    } else {
      $reject($error)
    }
  })
}

function bump($setVersion) {
  return () => new Promise(($resolve, $reject) => {
    const _run = run.bind(this, $reject)

    try {
      _run(`npm version --no-git-tag-version ${version}`, $stdout => {
        const _VERSION = $stdout.replace(/(?:^v|\r\n|\r|\n)/g, '')

        $setVersion(_VERSION)

        const _COMMAND = [
          'git add --all',
          `git commit -m 'bump(version): ${_VERSION} [ci skip]'`,
          'git push origin develop'
        ].join(' && ')

        _run(_COMMAND, $resolve)
      })
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  bump,
  bump as default
}
