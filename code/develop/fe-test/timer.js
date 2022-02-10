export default function(callback) {
  setTimeout(() => {
    callback()
  }, 3000)
}

export function advanceTimersByTime(fn) {
  setTimeout(() => {
    fn()
  }, 3000)
}
