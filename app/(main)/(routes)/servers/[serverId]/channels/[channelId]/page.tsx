// NextJS packages
import { redirect } from "next/navigation"

// Prisma packages
import { ChannelType } from "@prisma/client"

// Clerk
import { redirectToSignIn } from "@clerk/nextjs"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Components
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { MediaRoom } from "@/components/media-room"

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
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={true}
        />
      )}
    </div>
  )
}
 
export default ChannelIdPage
