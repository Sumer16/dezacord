// NextJS packages
import { redirect } from "next/navigation"

// Components
import { InitialModal } from "@/components/modals/initial-modal"

// Lib files
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"

// Setup page for server if no server assigned to user, redirect to Initial Modal setup for creating new server for the user
const SetupPage = async () => {
  // Either we are creating it or we are getting the current user here
  const profile = await initialProfile()

  // If we have a user, we try to find the server here
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  // If server present redirect to the present server using its id
  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}
 
export default SetupPage
