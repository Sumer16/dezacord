// NextJS packages
import { NextResponse } from "next/server"

// Prisma packages
import { Message } from "@prisma/client"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Number of messages that will be fetched at a time when we scroll down to load more
const MESSAGES_BATCH = 10

export async function GET(
  req: Request
) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)

    // To tell infinite load from what message to load the next batch of messages should be shown
    const cursor = searchParams.get("cursor") // This is the preferred method of using 'cursor'
    const channelId = searchParams.get("channelId")

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing.", { status: 400 })
    }

    let messages: Message[] = []

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            }
          }
        },
        orderBy: {
          createdAt: "desc",
        }
      })
    }

    let nextCursor = null

    // If the messages length is same as message batch then we pick last one id
    // If the length is lower then we have reached end of infinite load and that means we don't need
    // to load any more messages.
    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id
    }

    return NextResponse.json({
      items: messages,
      nextCursor
    })

  } catch (error) {
    console.log("[MESSAGES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
