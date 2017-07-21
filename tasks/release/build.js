// git checkout master
// git merge develop
// git rev-parse --verify HEAD
// webpack -p
// git add --all
// git commit -m "build(dist): v$npm_package_version [ci skip]"
// git push --force origin master

function build($setCommit) {
  return () => new Promise(($resolve, $reject) => {
    $setCommit('0123456789')
    $resolve()
  })
}

export {
  build,
  build as default
}
