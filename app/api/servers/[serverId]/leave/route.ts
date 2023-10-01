// NextJS packages
import { NextResponse } from "next/server"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string }}
) {
  try {
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse("Server ID missing.", { status: 400 })
    }

    // Makes sure only members leave the server and not the admin
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id // Making sure admin cannot leave the server themselves
        },
        members: {
          some: {
            profileId: profile.id
          }
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
