import * as index from '.'

describe('index', () => {
  describe('.SequentialPromiseProcessor(...$factories)', () => {
    describe('when imported', () => {
      it('is available as named member', () => {
        expect('SequentialPromiseProcessor' in index).toBe(true)
      })

      it('is also available as default member', () => {
        expect(index.default === index.SequentialPromiseProcessor).toBe(true)
      })
    })
  })

  describe('.isThenable($value)', () => {
    describe('when imported', () => {
      it('is available as named member', () => {
        expect('isThenable' in index).toBe(true)
      })
    })
  })
})
