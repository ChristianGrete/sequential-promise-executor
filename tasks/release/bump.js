// npm --no-git-tag-version version ${version}
// git add --all
// git commit -m "bump(version): $npm_package_version [ci skip]"
// git push origin develop

function bump() {
  return () => new Promise(($resolve, $reject) => {
    $resolve()
  })
}

export {
  bump,
  bump as default
}
