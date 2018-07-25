// eventBus

class EventBus {
  constructor() {
    this.queue = {}
  }
  on(fName, fn, scope) {
    let {
      queue
    } = this
    let arr = queue[fName] || []
    if (arr.length === 0) {
      queue[fName] = [{
        fn,
        scope
      }]
    } else {
      let _que = arr.find(_ => (_['fn'] === fn && _['scope'] === scope))
      if (_que) {
        console.error(`${fName} in this instance has beed register!`)
        return
      } else {
        queue[fName].push({
          fn,
          scope
        })
      }
    }
  }
  off(fName, scope) {
    let {
      queue
    } = this
    let _que = queue[fName] || []
    if (!_que) {
      console.error(`Can not find the method ${fName}`)
      return
    }
    let newArr = []
    for (let i = 0; i < _que.length; i++) {
      if (scope) {
        _que['scope'] !== scope && newArr.push(_que[i])
      }
    }
    queue[fName] = newArr
  }
  emit(fName, ...args) {
    let {
      queue
    } = this
    let fns = queue[fName]
    fns.forEach(item => {
      item['fn'] && item['fn'].call(item['scope'], ...args)
    })
  }
}

let eventBus = null

if (!eventBus) {
  eventBus = new EventBus()
}

export default eventBus
