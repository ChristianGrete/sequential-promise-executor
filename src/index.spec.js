import * as index from '.'

// const SequentialPromiseExecutor = index.SequentialPromiseExecutor

// let sequentialPromiseExecutor

describe('SequentialPromiseExecutor', () => {
  it('provides a default export', () => {
    expect(index.hasOwnProperty('default')).toBe(true)
  })

  it('provides a named export', () => {
    expect(index.hasOwnProperty('SequentialPromiseExecutor')).toBe(true)
  })

  // TODO: Test sequential promise execution
})
