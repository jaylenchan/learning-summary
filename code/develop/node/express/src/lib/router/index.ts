import { IHandler } from '../types'
import { IncomingMessage, ServerResponse } from 'http'
import Route from './route'
import Layer from './layer'
import { getPathname } from '../utils'

class Router {
  #stack: Layer[]

  constructor() {
    this.#stack = []
  }

  createLayer(path: string, handlers: IHandler[]) {
    const createRoute = (handlers: IHandler[]) => {
      const route = new Route(handlers)
      return route
    }
    return new Layer(path, createRoute(handlers))
  }

  get(path: string, handlers: IHandler[]) {
    const layer = this.createLayer(path, handlers)
    this.#stack.push(layer)
  }

  handler(req: IncomingMessage, res: ServerResponse, out: Function) {
    let index = 0
    const dispatch = () => {
      if (index === this.#stack.length) return out()
      const layer = this.#stack[index++]
      /**
       * 判断每一层的path是否匹配当前req的url
       * 如果是的话，那就调用这一层的dispatch方法
       */
      if (layer.match(getPathname(req.url))) {
        /** 如果匹配的话，就让layer去调用 */
        layer.handler(req, res, dispatch)
      } else {
        dispatch()
      }
    }
    dispatch()
    out()
  }
}

export default Router
