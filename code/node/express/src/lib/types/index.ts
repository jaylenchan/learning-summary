import { IncomingMessage, ServerResponse } from 'http'

export type IHandler = (res: IncomingMessage, req: ServerResponse) => void

export type IRoute = {
  path: string
  method: string
  handler(req: IncomingMessage, res: ServerResponse): void
}
