import createPromiseExecutor from './createPromiseExecutor'

function createPromiseFactory($onFulfilled, $onRejected, $isRejection) {
  return function createPromise() {
    const _executor = createPromiseExecutor($isRejection)
    const _promise = new Promise(_executor)

    _promise.then(
      $onFulfilled,
      $onRejected
    )

    return _promise
  }
}

export default createPromiseFactory
