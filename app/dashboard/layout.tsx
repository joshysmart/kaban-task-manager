'use client'
import * as Components from "@/components"
import React from "react"



export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {



  return (
    <section className="w-full">
      <Components.Sidenav />
      <Components.Navbar />
      {children}
    </section >
  )
}