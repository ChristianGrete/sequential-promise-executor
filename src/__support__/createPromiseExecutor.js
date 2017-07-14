import getRandomIntegerBetween from './getRandomIntegerBetween'

const DELAY_RANGE = Object.freeze([100, 250])

function createPromiseExecutor($isAsync, $isRejection) {
  return function execute($resolve, $reject) {
    function _onExecuted() {
      if ($isRejection) {
        $reject()
      } else {
        $resolve()
      }
    }

    if ($isAsync) {
      setTimeout(
        _onExecuted,
        getRandomIntegerBetween(...DELAY_RANGE)
      )
    } else {
      _onExecuted()
    }
  }
}

export default createPromiseExecutor
