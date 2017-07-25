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
  try {
    exec($command, ($error, $stdout) => {
      if ($error === null) {
        $resolve($stdout)
      } else {
        $reject($error)
      }
    })
  } catch ($error) {
    $reject($error)
  }
}

function bump($setVersion) {
  return () => new Promise(($resolve, $reject) => {
    const _run = run.bind(this, $reject)

    _run(`echo "npm version --no-git-tag-version ${version}"`, $stdout => {
      $stdout = '0.0.0'

      const _VERSION = $stdout.replace(/(?:^v|\r\n|\r|\n)/g, '')

      $setVersion(_VERSION)

      _run('echo "git add --all"', () => _run(
        `echo "git commit -m 'bump(version): ${_VERSION} [ci skip]'"`,
        () => _run('echo "git push origin develop"', $resolve)
      ))
    })
  })
}

export {
  bump,
  bump as default
}
