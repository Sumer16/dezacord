// NextJS packages
import { redirect } from "next/navigation"

// Clerk
import { redirectToSignIn } from "@clerk/nextjs"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

interface ServerIdPageProps {
  params: {
    serverId: string
  }
}

const ServerIdPage = async ({ 
  params 
}: ServerIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  // Here we don't allow users to rename the general channel name or delete it because we need it as staging place to redirect users when they land in the server
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== "general") {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}
 
export default ServerIdPage
