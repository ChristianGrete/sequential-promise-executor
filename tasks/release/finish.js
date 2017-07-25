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

function finish() {
  return () => new Promise(($resolve, $reject) => {
    const _run = run.bind(this, $reject)

    _run(
      'echo "git push --force origin master"',
      () => _run('echo "git checkout develop"', $resolve)
    )
  })
}

export {
  finish as default,
  finish
}
