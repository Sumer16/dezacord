// React packages
import React from "react"

const AuthLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-indigo-600 flex items-center justify-center">
      {children}
    </div>
  )
}
 
export default AuthLayout
