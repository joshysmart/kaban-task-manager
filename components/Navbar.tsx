'use client'
import { StateContext } from '@/app/page';
import React from 'react'
type Props = {}

export default function Navbar({ }: Props) {
  const navbarEl: React.RefObject<HTMLDivElement> = React.useRef(null)
  const stateContext = React.useContext(StateContext);

  React.useEffect(() => {
    if (navbarEl.current) {
      stateContext.handleSetNavbarHeight(navbarEl.current.clientHeight)
    }
  }, [stateContext])

  return (
    <nav className='fixed top-0 right-0 w-[80%]' ref={navbarEl}>Navbar</nav>
  )
}