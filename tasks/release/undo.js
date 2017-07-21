// git reset --hard ${commit}

function undo($getCommit) {
  return () => new Promise(($resolve, $reject) => {
    console.log($getCommit())
    $resolve()
  })
}

export {
  undo as default,
  undo
}
