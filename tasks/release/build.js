import {exec} from 'child_process'

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

function build($getVersion, $setCommit) {
  return () => new Promise(($resolve, $reject) => {
    const _VERSION = $getVersion()

    const _run = run.bind(this, $reject)

    _run('echo "git checkout master"', () => _run(
      'echo "git merge develop"',
      () => _run('git rev-parse --verify HEAD', $stdout => {
        const _COMMIT = $stdout.replace(/(?:\r\n|\r|\n)/g, '')

        $setCommit(_COMMIT)

        _run('webpack -p', () => _run('echo "git add --all"', () => _run(
          `echo "git commit -m 'build(dist): v${_VERSION} [ci skip]'"`,
          () => _run('echo "git push --force origin master"', $resolve)
        )))
      })
    ))
  })
}

export {
  build,
  build as default
}
