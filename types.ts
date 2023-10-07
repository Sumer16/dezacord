// NextJS packages
import { NextApiResponse } from "next"
import { Server as NetServer, Socket } from "net"

// SocketIO
import { Server as SocketIOServer } from "socket.io"

// Prisma packages
import { Server, Member, Profile } from "@prisma/client"

// Custom type for server sidebar because the type for server variable in server-sidebar.tsx is different than others.
// This type check will help us to validate that variable when sent as a prop to server-header
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[]
}

// Custom response type for using it in the io.ts that is in pages route
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
