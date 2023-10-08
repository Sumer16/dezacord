"use client"

// React packages
import { 
  createContext,
  useContext, 
  useEffect,
  useState,
} from "react"

// SocketIO
import { io as ClientIO } from "socket.io-client"

type SocketContextType = {
  socket: any | null
  isConnected: boolean
}

// Our SocketContext
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
})

// Our Socket custom hook
export const useSocket = () => {
  return useContext(SocketContext)
}

// Providing SocketIO connection for conversations
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ socket, setSocket ] = useState(null)
  const [ isConnected , setIsConnected ] = useState(false)

  useEffect(() => {
    // By default this env points to localhost in dev mode but we will change this in our deployed env
    // In local dev it points to localhost change this in production
    const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
