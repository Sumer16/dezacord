import { generateComponents } from "@uploadthing/react"
 
import type { OurFileRouter } from "@/app/api/uploadthing/core"

// Components to render by uploadthing
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>()
