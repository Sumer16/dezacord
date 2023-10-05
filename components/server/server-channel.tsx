"use client"

// Prisma packages
import { 
  Channel, 
  ChannelType, 
  MemberRole, 
  Server 
} from "@prisma/client"

// Lib files
import { cn } from "@/lib/utils"

// Icons
import { Hash, Mic, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface ServerChannelProps {
  channel: Channel
  server: Server
  role?: MemberRole
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
}

export const ServerChannel = ({ 
  channel, 
  server, 
  role, 
}: ServerChannelProps) => {
  const params = useParams()
  const router = useRouter()

  const Icon = iconMap[channel.type]

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-"
      )}
    >

    </button>
  )
}