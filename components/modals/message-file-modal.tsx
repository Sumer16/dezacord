"use client"

// React packages
import { useForm } from "react-hook-form"

// NextJS packages
import { useRouter } from "next/navigation"

// Custom hooks
import { useModal } from "@/hooks/use-model-store"

// Libraries
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import qs from "query-string"

// Components
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

// Zod form schema
const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required."
  })
})

// This can only be used for Message (conversation) file uploads
export const MessageFileModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === "messageFile"
  const { apiUrl, query } = data

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    }
  })

  const handleClose = () => {
    form.reset()
    onClose()
  }

  // Custom loader
  const isLoading  = form.formState.isSubmitting

  // Custom form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try { 
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })

      form.reset()
      router.refresh()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
