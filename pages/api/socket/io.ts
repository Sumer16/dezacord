// Setup SocketIO

// NextJS packages
import { NextApiRequest } from "next"
import { Server as NetServer } from "http"

// SocketIO
import { Server as ServerIO } from "socket.io"

// Custom types
import { NextApiResponseServerIo } from "@/types"

// Turn off body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io"
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;
  }

  res.end();
}

export default ioHandler
