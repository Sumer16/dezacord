// Clerk
import { currentUser, redirectToSignIn } from "@clerk/nextjs"

// Lib files
import { db } from "@/lib/db"

// If user not present in DB then redirect to sign up or sign in
export const initialProfile = async () => {
  const user = await currentUser()

  if (!user) {
    return redirectToSignIn()
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  })

  if (profile) {
    return profile
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile
}
