// This file is for the messages (that need userID for individual conversations & group) present in the "pages" folder that socket is 
// using for routing since NextJS 13.5 doesn't support SocketIO in app routing.

// This file is separate from the normal current-profile because NextJS 13.5 doesn't support a single file for both routing methods
// that is using "app" & "pages" folder. So we need to use different auth method for this one.

// NextJS packages
import { NextApiRequest } from "next"

// Clerk
import { getAuth } from "@clerk/nextjs/server"

// Lib files
import { db } from "@/lib/db"

// To find UserId of current profile for "pages" folder
export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  })

  return profile
}
