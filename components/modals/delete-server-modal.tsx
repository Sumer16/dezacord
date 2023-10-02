"use client"

// React packages
import { useState } from "react"

// NextJS packages
import { useRouter } from "next/navigation"

// Custom hooks
import { useModal } from "@/hooks/use-model-store"

// Libraries
import axios from "axios"

// Components
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Delete Server Modal
export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === "deleteServer"
  const { server } = data

  const [ isLoading, setIsLoading ] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      
      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      router.refresh()
      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            This action cannot be undone. Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button 
              disabled={isLoading} 
              onClick={onClose} 
              variant="ghost"
            >
              Cancel
            </Button>
            <Button 
              disabled={isLoading} 
              onClick={onClick}
              variant="primary" 
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}