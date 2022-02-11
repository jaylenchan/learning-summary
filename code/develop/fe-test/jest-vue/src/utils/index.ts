export function parse(str: string) {
  if (!str.includes('?')) return {}
  let param_str = str.slice(str.indexOf('?') + 1)
  let params = param_str.split('&')
  return params.reduce((res: any, curParam) => {
    const [key, val] = curParam.split('=')
    res[key] = val
    return res
  }, {})
}

export function stringify(obj: any) {
  if (Reflect.ownKeys(obj).length === 0) return obj
  return Reflect.ownKeys(obj).reduce((res: string, curKey: any) => {
    res === ''
      ? (res += `${curKey}=${obj[curKey]}`)
      : (res += `&${curKey}=${obj[curKey]}`)
    return res
  }, '')
}
