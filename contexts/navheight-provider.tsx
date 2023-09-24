'use client'
import React from "react";

type TNavHeightContext = {
  navbarHeight: number,
  setNavbarHeight: React.Dispatch<React.SetStateAction<number>>
}


export const NavHeightContext = React.createContext<TNavHeightContext | null>(null)

export default function NavHeightProvider({ children }: { children: React.ReactNode }) {
  const [navbarHeight, setNavbarHeight] = React.useState(0)

  return <NavHeightContext.Provider value={{ navbarHeight, setNavbarHeight }}>{children}</NavHeightContext.Provider>
}

export const useNavHeightContext = () => {
  const navHeightContext = React.useContext(NavHeightContext)
  if (!navHeightContext) {
    throw new Error('useNavHeightContext must be used within a ThemeProvider')
  }
  return navHeightContext
}