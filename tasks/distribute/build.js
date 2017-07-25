import {exec} from 'child_process'

const run = ($reject, $command, $resolve) => {
  exec($command, ($error, $stdout) => {
    if ($error === null) {
      $resolve($stdout)
    } else {
      $reject($error)
    }
  })
}

function build($getVersion, $setCommit) {
  return () => new Promise(($resolve, $reject) => {
    const _VERSION = $getVersion()

    const _run = run.bind(this, $reject)

    try {
      _run(
        'git checkout master && git merge develop',
        () => _run('git rev-parse --verify HEAD', $stdout => {
          const _COMMIT = $stdout.replace(/(?:\r\n|\r|\n)/g, '')

          $setCommit(_COMMIT)

          const _COMMAND = [
            'webpack -p',
            'git add --all',
            `git commit -m 'build(dist): v${_VERSION} [ci skip]'`,
            'git push --force origin master'
          ].join(' && ')

          _run(_COMMAND, $resolve)
        })
      )
    } catch ($error) {
      $reject($error)
    }
  })
}

export {
  build,
  build as default
}
