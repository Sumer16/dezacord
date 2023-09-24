// NextJS packages
import { redirect } from "next/navigation"

// Components
import { InitialModal } from "@/components/modals/initial-modal"

// Lib files
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"

const SetupPage = async () => {
  const profile = await initialProfile()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}
 
export default SetupPage
