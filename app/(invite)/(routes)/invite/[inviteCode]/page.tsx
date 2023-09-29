// NextJS packages
import { redirect } from "next/navigation"

// Clerk
import { redirectToSignIn } from "@clerk/nextjs"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

interface InviteCodePageProps {
  params: {
    inviteCode: string
  }
}

// After Invite Code is used to join a server load this page
const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect("/")
  }

  // Check if the person trying to join the server using the new link is already in the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  // Redirect them to the server if they are already part of that server
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  // Otherwise update the server (with members, add them to this server if they are not part of it) using the unique invite code
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null
}
 
export default InviteCodePage
