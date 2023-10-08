"use client"

// NextJS packages
import Image from "next/image"

// Lib file - custom file rather than internal package
import { UploadDropzone } from "@/lib/uploadthing"

// Icons
import { FileIcon, X } from "lucide-react"

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

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a 
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
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
