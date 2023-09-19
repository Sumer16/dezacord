import React from "react"

const AuthLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="bg-indigo-600 h-full">
      {children}
    </div>
  )
}
 
export default AuthLayout