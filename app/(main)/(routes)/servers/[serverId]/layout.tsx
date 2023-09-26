// NextJS packages
import { redirect } from "next/navigation"

// Clerk
import { redirectToSignIn } from "@clerk/nextjs"

// Components
import { ServerSidebar } from "@/components/server/server-sidebar"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Renders everything that is related to the server ID
const ServerIdLayout = async (
  { 
    children, 
    params, 
  }: { 
    children: React.ReactNode
    params: { serverId: string }
  }) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (!server) {
    return redirect("/")
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  )
}
 
export default ServerIdLayout
