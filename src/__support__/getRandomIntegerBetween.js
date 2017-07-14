function getRandomIntegerBetween($minValue, $maxValue) {
  return $minValue + Math.floor(Math.random() * ($maxValue - $minValue + 1))
}

export default getRandomIntegerBetween
