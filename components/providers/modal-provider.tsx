"use client"

// React packages
import { useEffect, useState } from "react"

// Components
import { CreateServerModal } from "@/components/modals/create-server-modal"
import { InviteModal } from "@/components/modals/invite-modal"
import { EditServerModal } from "@/components/modals/edit-server-modal"

// This is return a Fragment and here we will render all our modals
export const ModalProvider = () => {
  // Preventing the modals to be rendered on server side coz that can cause inconsistency, thus creating Hydration errors.
  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  )
}
