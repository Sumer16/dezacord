import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
) {
  try {
    const profile = await currentProfile()
    const { name, type } = await req.json()
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get("serverId")

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!serverId) {
      return new NextResponse("Server ID missing.", { status: 400 })
    }

    // Protecting this channel name so that when user switches to a server they will always land on channel name - general (by default)
    // Not allowing admins/moderators to create a channel name with general as only one channel should be general so that the user will
    // always land there by default and to cause less confusion code wise.
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          }
        }
      }
    })

    return NextResponse.json(server)

  } catch (error) {
    console.log("CHANNELS_POST", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
