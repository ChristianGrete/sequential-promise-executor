// git push --force origin master
// git checkout develop

function finish() {
  return () => new Promise(($resolve, $reject) => {
    $resolve()
  })
}

export {
  finish as default,
  finish
}
