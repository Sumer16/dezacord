// NextJS packages
import { redirect } from "next/navigation"

// Clerk
import { redirectToSignIn } from "@clerk/nextjs"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Components
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async ({ 
  params 
}: ChannelIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  // To find the channel ID
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })
  
  // To find the member using serverId and profileId as members already inside would have the server Id and also the profile Id associated to that server
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    redirect("/")
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader 
        serverId={channel.serverId} 
        name={channel.name} 
        type="channel" 
      />
      <div className="flex-1">
        Future Messages
      </div>
      <ChatInput  
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  )
}
 
export default ChannelIdPage
