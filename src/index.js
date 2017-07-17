const STATE_BUSY = 1
const STATE_IDLE = null
const STATE_PAUSED = 0

const store = new Map()

function step() {
  if (this.state === STATE_BUSY) {
    const _factory = this.queue[0]

    if (typeof _factory === 'function') {
      const _promise = _factory()

      this.queue.shift()

      if (_promise !== null && typeof _promise === 'object') {
        _promise.then(
          onFulfilled.bind(this),
          onRejected.bind(this)
        )
      }
    }
  }
}

function onFulfilled() {
  if (this.queue.length > 0) {
    step.call(this)
  } else if (this.state === STATE_BUSY) {
    this.state = STATE_IDLE
  }
}

function onRejected() {
  this.queue = []

  if (this.state === STATE_BUSY) {
    this.state = STATE_IDLE
  }
}

class SequentialPromiseProcessor {
  constructor(...$factories) {
    store.set(this, Object.create(null, {
      'queue': {
        'value': [],
        'writable': true
      },
      'state': {
        'value': STATE_IDLE,
        'writable': true
      }
    }))

    return $factories.length > 0 ? this.queue(...$factories) : this
  }

  queue(...$factories) {
    const _queue = store.get(this).queue

    $factories.forEach($factory => {
      if (Array.isArray($factory)) {
        return this.queue(...$factory)
      }

      if (typeof $factory === 'function') {
        _queue.push($factory)
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
        const _index = _queue.indexOf($factory)

        if (_index > -1) {
          _queue.splice(_index, 1)
        }

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

export {
  SequentialPromiseProcessor,
  SequentialPromiseProcessor as default
}
