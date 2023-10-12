// Clerk
import { auth } from "@clerk/nextjs"

// Lib files
import { db } from "@/lib/db"

// To find UserId of current profile
export const currentProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}
