import { IHandler } from './../types/index'

class RouteLayer {
  method: string
  handler: (req, res, dispatch) => void

  constructor(method: string, handler: IHandler) {
    this.method = method
    this.handler = handler
  }
}

export default RouteLayer
