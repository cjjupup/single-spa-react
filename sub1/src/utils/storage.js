export const lcStorage = {
  setItem (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  getItem (key) {
    let strvalue = window.localStorage.getItem(key)
    let jsonValue = JSON.parse(strvalue)
    return jsonValue
  },
  removeItem (key) {
    window.localStorage.removeItem(key)
  },
  clearAll () {
    window.localStorage.clear()
  }
}

export const ssStorage = {
  setItem (key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  getItem (key) {
    let strvalue = window.sessionStorage.getItem(key)
    let jsonValue = JSON.parse(strvalue)
    return jsonValue
  },
  removeItem (key) {
    window.sessionStorage.removeItem(key)
  },
  clearAll () {
    window.sessionStorage.clear()
  }
}
