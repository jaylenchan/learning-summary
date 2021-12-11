import { getMethod } from './../utils/index'
import { IncomingMessage, ServerResponse } from 'http'
import { IHandler } from '../types'
import RouteLayer from './routeLayer'

class Route {
  #stack: RouteLayer[]
  constructor(handlers: IHandler[]) {
    this.#stack = []
    this.createGetHandlerLayer(handlers)
  }

  createGetHandlerLayer(handlers: IHandler[]) {
    handlers.forEach((handler) => {
      const layer = new RouteLayer('get', handler)
      this.#stack.push(layer)
    })
  }

  dispatch(req: IncomingMessage, res: ServerResponse, out: (...args: any[]) => void) {
    let index = 0
    const dispatch = () => {
      if (index === this.#stack.length) return out()
      const routeLayer = this.#stack[index++]
      if (routeLayer.method === getMethod(req)) {
        routeLayer.handler(req, res, dispatch)
      } else {
        dispatch()
      }
    }
    dispatch()
  }
}

export default Route
