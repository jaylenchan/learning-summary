import http, { IncomingMessage, ServerResponse } from 'http'
import url from 'url'
import Router from './router'
import { IHandler, IRoute } from './types'

class Application {
  #router: Router
  constructor() {
    this.#router = new Router()
  }
  get(path: string, ...handlers: IHandler[]) {
    this.#router.get(path, handlers)
  }

  listen(port: number, cb: (...args: any[]) => void) {
    const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      const done: IHandler = (req, res) => {
        res.end(`Cannot ${req.method} ${req.url}`)
      }
      this.#router.handler(req, res, done)
    })
    server.listen(port, cb)
  }
}

export default Application
