function clean(...$arguments) {
  return () => new Promise(($resolve, $reject) => {
    $resolve()
  })
}

export {
  clean,
  clean as default
}
