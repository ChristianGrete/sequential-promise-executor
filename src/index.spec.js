import * as src from '.'
import {createPromiseFactory} from './__support__'

const SequentialPromiseExecutor = src.SequentialPromiseExecutor
const srcHasMember = {}.hasOwnProperty.bind(src)

var subject

describe('SequentialPromiseExecutor', () => {
  describe('when imported', () => {
    it('is available as default member', () => {
      expect(srcHasMember('default')).toBe(true)
    })

    it('is also available as named member', () => {
      expect(srcHasMember('SequentialPromiseExecutor')).toBe(true)
    })
  })

  describe('.constructor(...$factories)', () => {
    const _prototype = SequentialPromiseExecutor.prototype
    const _originalQueueMethod = _prototype.queue

    beforeEach(() => {
      _prototype.queue = jest.fn()
    })

    describe('when invoked with arguments', () => {
      beforeEach(() => {
        subject = new SequentialPromiseExecutor(
          () => {},
          () => {}
        )
      })

      it('calls .queue(...$factories) and passes arguments', () => {
        expect(subject.queue).toHaveBeenCalledWith(
          expect.any(Function),
          expect.any(Function)
        )
      })
    })

    describe('when invoked without arguments', () => {
      beforeEach(() => {
        subject = new SequentialPromiseExecutor()
      })

      it('does not call .queue(...$factories)', () => {
        expect(subject.queue).not.toHaveBeenCalled()
      })
    })

    afterAll(() => {
      _prototype.queue = _originalQueueMethod
    })
  })

  describe('when instantiated', () => {
    beforeEach(() => {
      subject = new SequentialPromiseExecutor()
    })

    describe('.queue(...$factories)', () => {
      var _isRejection
      var _onFulfilled
      var _onRejected

      describe('when promise is resolvable', () => {
        beforeEach(() => {
          _isRejection = false
          _onRejected = jest.fn()
        })

        it("calls the promise' fulfillment handler", $done => {
          function _onFulfilled() {
            expect(_onRejected).not.toHaveBeenCalled()
            $done()
          }

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isRejection
          )

          subject.queue(_factory)
        })
      })

      describe('when promise is not resolvable', () => {
        beforeEach(() => {
          _isRejection = true
          _onFulfilled = jest.fn()
        })

        it("calls the promise' rejection handler", $done => {
          function _onRejected() {
            expect(_onFulfilled).not.toHaveBeenCalled()
            $done()
          }

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isRejection
          )

          subject.queue(_factory)
        })
      })
    })

    describe('.unqueue(...$factories)', () => {
      // TODO
    })

    describe('.process()', () => {
      beforeEach(() => {
        subject.resume = jest.fn()
        subject.process()
      })

      it('calls .resume()', () => {
        expect(subject.resume).toHaveBeenCalled()
      })
    })

    describe('.resume()', () => {
      // TODO
    })

    describe('.pause()', () => {
      // TODO
    })

    describe('.cancel()', () => {
      // TODO
    })
  })
})
