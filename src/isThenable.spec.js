import isThenable from './isThenable'
import {createPromiseExecutor} from './__support__'

const subject = isThenable

describe('isThenable($value)', () => {
  describe('when invoked with promise as argument', () => {
    const _promise = new Promise(createPromiseExecutor())

    it('returns true', () => {
      expect(subject(_promise)).toBe(true)
    })
  })

  describe('when invoked with thenable as argument', () => {
    var _thenable

    describe('and thenable is object', () => {
      _thenable = {
        then() {}
      }

      it('returns true', () => {
        expect(subject(_thenable)).toBe(true)
      })
    })

    describe('and thenable is function', () => {
      _thenable = () => {}
      _thenable.then = () => {}

      it('returns true', () => {
        expect(subject(_thenable)).toBe(true)
      })
    })
  })

  describe('when invoked with non-thenable as argument', () => {
    describe('and non-thenable is undefined', () => {
      var _undefined

      it('returns false', () => {
        expect(subject(_undefined)).toBe(false)
      })
    })

    describe('and non-thenable is null', () => {
      it('returns false', () => {
        expect(subject(null)).toBe(false)
      })
    })

    describe('and non-thenable is primitive', () => {
      it('returns false', () => {
        expect(subject(0)).toBe(false)
      })
    })

    describe('and non-thenable is function', () => {
      it('returns false', () => {
        expect(subject(() => {})).toBe(false)
      })
    })

    describe('and non-thenable is object', () => {
      it('returns false', () => {
        expect(subject({})).toBe(false)
      })
    })
  })

  describe('when invoked without arguments', () => {
    it('returns false', () => {
      expect(subject()).toBe(false)
    })
  })
})
