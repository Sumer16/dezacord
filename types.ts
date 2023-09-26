// Prisma packages
import { Server, Member, Profile } from "@prisma/client"

// Custom type for server sidebar because the type for server variable in server-sidebar.tsx is different than others.
// This type check will help us to validate that variable when sent as a prop to server-header
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[]
}
