function isThenable($value) {
  const _type = typeof $value

  return $value !== null && (_type === 'object' || _type === 'function') &&
    typeof $value.then === 'function'
}

export default isThenable
