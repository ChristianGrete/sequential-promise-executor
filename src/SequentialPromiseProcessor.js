import isThenable from './isThenable'

const STATE_BUSY = 1
const STATE_IDLE = null
const STATE_PAUSED = 0

const store = new Map()

function step() {
  if (this.state === STATE_BUSY) {
    const _queuer = this.queue[0]

    if (_queuer.calls > 0) {
      return
    }

    const _promise = _queuer.factory()

    _queuer.calls ++

    if (isThenable(_promise)) {
      try {
        _promise.then(
          onFulfilled.bind(this),
          onRejected.bind(this)
        )
      } catch ($error) {
        onRejected.call(this, $error)
      }
    } else {
      onRejected.call(this, new TypeError())
    }
  }
}

function onFulfilled() {
  this.queue.shift()

  if (this.queue.length > 0) {
    step.call(this)
  } else if (this.state === STATE_BUSY) {
    this.state = STATE_IDLE
  }
}

function onRejected($reason) {
  this.queue = []

  if (this.state === STATE_BUSY) {
    this.state = STATE_IDLE
  }

  if ($reason != null) {
    console.error($reason) // eslint-disable-line no-console
  }
}

class SequentialPromiseProcessor {
  constructor(...$factories) {
    const _store = Object.create(null, {
      queue: {
        value: [],
        writable: true
      },
      state: {
        value: STATE_IDLE,
        writable: true
      }
    })

    store.set(this, _store)

    Object.defineProperties(this, {
      length: {
        get() {
          return _store.queue.length
        },
        set() {}
      },
      unprocessed: {
        get() {
          return _store.queue.map($queuer => $queuer.factory)
        },
        set($factories) {
          this.queue($factories)
        }
      }
    })

    return $factories.length > 0 ? this.queue(...$factories) : this
  }

  queue(...$factories) {
    const _queue = store.get(this).queue

    $factories.forEach($factory => {
      if (Array.isArray($factory)) {
        return this.queue(...$factory)
      }

      if (typeof $factory === 'function') {
        const _queuer = Object.create(null, {
          calls: {
            value: 0,
            writable: true
          },
          factory: {
            value: $factory
          }
        })

        _queue.push(_queuer)
      }
    })

    return this
  }

  unqueue(...$factories) {
    $factories.forEach($factory => {
      if (Array.isArray($factory)) {
        return this.unqueue(...$factory)
      }

      if (typeof $factory === 'function') {
        this.pause()

        const _queue = store.get(this).queue

        _queue.filter(($queuer, $index) => {
          if ($queuer.factory === $factory) {
            _queue.splice($index, 1)
          }
        })

        this.resume()
      }
    })

    return this
  }

  process() {
    return store.get(this).state === STATE_IDLE ? this.resume() : this
  }

  resume() {
    const _store = store.get(this)

    if (_store.state !== STATE_BUSY && _store.queue.length > 0) {
      _store.state = STATE_BUSY

      step.call(_store)
    }

    return this
  }

  pause() {
    const _store = store.get(this)

    if (_store.state === STATE_BUSY) {
      _store.state = STATE_PAUSED
    }

    return this
  }

  cancel() {
    onRejected.call(store.get(this))

    return this
  }
}

Object.defineProperties(SequentialPromiseProcessor.prototype, {
  length: {
    configurable: true,
    value: 0,
    writable: true
  },
  unprocessed: {
    configurable: true,
    value: [],
    writable: true
  }
})

export default SequentialPromiseProcessor
