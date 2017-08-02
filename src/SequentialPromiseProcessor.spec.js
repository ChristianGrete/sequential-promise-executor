import SequentialPromiseProcessor from './SequentialPromiseProcessor'
import {createPromiseFactory} from './__support__'

var subject

describe('SequentialPromiseProcessor', () => {
  describe('.constructor(...$factories)', () => {
    const _prototype = SequentialPromiseProcessor.prototype
    const _originalQueueMethod = _prototype.queue

    beforeEach(() => {
      _prototype.queue = jest.fn()
    })

    describe('when invoked with arguments', () => {
      beforeEach(() => {
        subject = new SequentialPromiseProcessor(
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
        subject = new SequentialPromiseProcessor()
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
    var _isAsync
    var _isRejection
    var _onFulfilled
    var _onRejected

    beforeEach(() => {
      _isAsync = false
      _isRejection = false
      _onFulfilled = jest.fn()
      _onRejected = jest.fn()
      subject = new SequentialPromiseProcessor()
    })

    describe('.queue(...$factories)', () => {
      it('is chainable', () => {
        expect(subject.queue()).toBe(subject)
      })

      describe('when promise is resolvable', () => {
        it("calls the promise' fulfillment handler", $done => {
          function _onFulfilled() {
            expect(_onRejected).not.toHaveBeenCalled()
            $done()
          }

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isAsync,
            _isRejection
          )

          subject
            .queue(_factory)
            .process()
        })

        it('executes promises sequentially', $done => {
          var _lastCount = 0

          const _COUNT = 9

          const _factories = []

          _isAsync = true

          function _onFulfilled($count) {
            expect(_lastCount += 1).toBe($count)

            if ($count === _COUNT) {
              expect(_onRejected).not.toHaveBeenCalled()
              $done()
            }
          }

          for (let _index = 0; _index < _COUNT; _index ++) {
            const _factory = createPromiseFactory(
              () => _onFulfilled(_index + 1),
              _onRejected,
              _isAsync,
              _isRejection
            )

            _factories.push(_factory)
          }

          _factories.forEach($factory => {
            subject.queue($factory)
          })

          subject.process()
        })

        it('accepts factories nested in arrays as arguments', $done => {
          _onFulfilled = $done

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isAsync,
            _isRejection
          )

          const _actual = () => subject.queue([_factory])

          expect(_actual).not.toThrow()

          subject.process()
        })
      })

      describe('when promise is not resolvable', () => {
        beforeEach(() => {
          _isRejection = true
        })

        it("calls the promise' rejection handler", $done => {
          function _onRejected() {
            expect(_onFulfilled).not.toHaveBeenCalled()
            $done()
          }

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isAsync,
            _isRejection
          )

          subject
            .queue(_factory)
            .process()
        })
      })
    })

    describe('.length', () => {
      var _factories

      const _COUNT = 3

      beforeEach(() => {
        _factories = []
      })

      it('is immutable', () => {
        const _actual = () => subject.length = 1

        expect(_actual).toThrow()
      })

      it('initially returns zero', () => {
        expect(subject.length).toBe(0)
      })

      it('returns count of queued factories', () => {
        for (let _index = 0; _index < _COUNT; _index ++) {
          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isAsync,
            _isRejection
          )

          _factories.push(_factory)
        }

        subject.queue(_factories)

        expect(subject.length).toBe(_COUNT)
      })

      describe('when promises are processed', () => {
        it('gets updated', $done => {
          function _onFulfilled($count) {
            if ($count === _COUNT) {
              setTimeout(() => {
                expect(subject.length).toBe(0)
                $done()
              })
            } else {
              expect(subject.length).toBeLessThanOrEqual(_COUNT)
              expect(subject.length).toBeGreaterThan(0)
            }
          }

          for (let _index = 0; _index < _COUNT; _index ++) {
            const _factory = createPromiseFactory(
              () => _onFulfilled(_index + 1),
              _onRejected,
              _isAsync,
              _isRejection
            )

            _factories.push(_factory)
          }

          subject.queue(_factories).process()
        })
      })
    })

    describe('.unqueue(...$factories)', () => {
      it('is chainable', () => {
        expect(subject.unqueue()).toBe(subject)
      })
    })

    describe('.process()', () => {
      it('is chainable', () => {
        expect(subject.process()).toBe(subject)
      })

      describe('when idle', () => {
        beforeEach(() => {
          subject.resume = jest.fn()
          subject.process()
        })

        it('calls .resume()', () => {
          expect(subject.resume).toHaveBeenCalled()
        })
      })

      describe('when not idle', () => {
        beforeEach(() => {
          _isAsync = true

          const _factory = createPromiseFactory(
            _onFulfilled,
            _onRejected,
            _isAsync,
            _isRejection
          )

          subject
            .queue(_factory)
            .process()

          subject.resume = jest.fn()

          subject.process()
        })

        it('does nothing', () => {
          expect(subject.resume).not.toHaveBeenCalled()
        })
      })
    })

    describe('.resume()', () => {
      it('is chainable', () => {
        expect(subject.resume()).toBe(subject)
      })

      // TODO
    })

    describe('.pause()', () => {
      it('is chainable', () => {
        expect(subject.pause()).toBe(subject)
      })

      // TODO
    })

    describe('.cancel()', () => {
      it('is chainable', () => {
        expect(subject.cancel()).toBe(subject)
      })

      // TODO
    })
  })
})
