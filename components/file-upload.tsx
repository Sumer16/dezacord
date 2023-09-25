"use client"

// NextJS packages
import { X } from "lucide-react"
import Image from "next/image"

// uploadthing
import "@uploadthing/react/styles.css"

// Lib file - custom file rather than internal package
import { UploadDropzone } from "@/lib/uploadthing"

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: "messageFile" | "serverImage"
}

// File Upload component in server creation modal
export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop()

  // Checks filetype is not pdf which means it is an image since we except only two formats -> image & pdf
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image 
          fill
          src={value}
          alt="Upload"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full"
        />
        <button 
          onClick={() => onChange("")} 
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" 
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone 
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
