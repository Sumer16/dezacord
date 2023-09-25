// NextJS packages
import { redirect } from "next/navigation"

// Clerk
import { UserButton } from "@clerk/nextjs"

// Lib files
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

// Components
import { NavigationAction } from "@/components/navigation/navigation-action"
import { NavigationItem } from "@/components/navigation/navigation-item"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"

// This is a server component
export const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect("/")
  }

  // to find the server related to the logged user to display it here
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem 
              id={server.id} 
              name={server.name} 
              imageUrl={server.imageUrl} 
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>
    </div>
  )
}
