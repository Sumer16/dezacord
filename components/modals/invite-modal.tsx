"use client"

// React packages
import { useState } from "react"

// Custom hooks
import { useModal } from "@/hooks/use-model-store"
import { useOrigin } from "@/hooks/use-origin"

// Libraries
import axios from "axios"

// Components
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Icons
import { Check, Copy, RefreshCw } from "lucide-react"

// Invite Modal
export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()

  const isModalOpen = isOpen && type === "invite"
  const { server } = data

  const [ copied, setCopied ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  // In App as org folder (invite)
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      // In api/servers/[serverId]
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)

      // we will update this modals data and send it to the server and this will immediately update our invite url
      onOpen("invite", { server: response.data })
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input 
              disabled={isLoading}
              className="bg-zinc-500/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button 
              disabled={isLoading} 
              onClick={onCopy} 
              size="icon"
            >
              {copied ? 
                <Check className="w-4 h-4 text-green-600" /> : 
                <Copy className="w-4 h-4 text-zinc-600" />
              }
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
