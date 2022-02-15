export function getDataByCallBack(cb) {
  setTimeout(() => {
    cb({ name: 'jaylen' })
  }, 3000)
}

export function getDataByPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'jaylen' })
    }, 3000)
  })
}
