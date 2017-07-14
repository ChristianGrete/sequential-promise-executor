import getRandomIntegerBetween from './getRandomIntegerBetween'

const DELAY_RANGE = Object.freeze([100, 250])

function createPromiseExecutor($isRejection) {
  return function execute($resolve, $reject) {
    setTimeout(() => {
      if ($isRejection) {
        $reject()
      } else {
        $resolve()
      }
    }, getRandomIntegerBetween(...DELAY_RANGE))
  }
}

export default createPromiseExecutor
