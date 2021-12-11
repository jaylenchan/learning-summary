import { IncomingMessage, ServerResponse } from 'http'
import Route from './route'

class Layer {
  path: string
  route: Route
  handler: (
    req: IncomingMessage,
    res: ServerResponse,
    next: (...args: any[]) => void
  ) => void

  constructor(path: string, route: Route) {
    this.path = path
    this.route = route
    this.handler = route?.dispatch.bind(route)
  }

  match(pathname: string) {
    return this.path === pathname
  }
}

export default Layer
