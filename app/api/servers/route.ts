// NextJS packages
import { NextResponse } from "next/server"

// UUID
import { v4 as uuidv4} from "uuid"

// Prisma packages - name (MemberRole) imported from our schema
import { MemberRole } from "@prisma/client"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // To create a server in PlanetScale based on the Prisma schema using existing logged in user
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: "general", profileId: profile.id }
          ]
        },
        members: {
          create: [
            { profileId: profile.id, role: MemberRole.ADMIN }
          ]
        }
      }
    })

    return NextResponse.json(server)

  } catch (error) {
    console.log("[SERVERS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}