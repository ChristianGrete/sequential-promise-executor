// git tag -a "v$npm_package_version" -m "release(?): lorem ipsum dolor"
// git push --tags
// prep package
// npm publish --access public

function release() {
  return () => new Promise(($resolve, $reject) => {
    $resolve()
  })
}

export {
  release as default,
  release
}
