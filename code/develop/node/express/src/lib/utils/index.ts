import { IncomingMessage } from 'http'
import url from 'url'
/** 获取path */
export const getPathname = (reqUrl: string = '') => {
  const { pathname } = url.parse(reqUrl)
  return pathname as string
}

/** 获取method */
export const getMethod = (req: IncomingMessage) => {
  return req.method?.toLowerCase()
}
