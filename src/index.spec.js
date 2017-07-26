import * as index from '.'

describe('SequentialPromiseProcessor', () => {
  describe('when imported', () => {
    it('is available as named member', () => {
      expect('SequentialPromiseProcessor' in index).toBe(true)
    })

    it('is also available as default member', () => {
      expect(index.default === index.SequentialPromiseProcessor).toBe(true)
    })
  })
})
