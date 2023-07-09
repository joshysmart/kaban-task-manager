'use client'
import Image from 'next/image'
import React from 'react'
import DashboardLayout from './dashboard/layout'

// Todo: Create navbar component.
// Todo: Create sideNav.
// Todo: Create view task.
// Todo: Create add task.
// Todo: Create edit task.
// Todo: Create add board.
// Todo: Create edit board.
// Todo: Create delete board.
// Todo: Create delete task.

export const StateContext = React.createContext<{ navbarHeight: number, handleSetNavbarHeight: (height: number) => void }>({
  navbarHeight: 0,
  handleSetNavbarHeight: () => { }
})

/**
 * A functional component representing the Home page.
 * @returns {JSX.Element} The rendered JSX element.
 */
export default function Home() {
  const [navbarHeight, setNavbarHeight] = React.useState(0)

  const handleSetNavbarHeight = (height: number) => {
    setNavbarHeight(height)
  }

  const myStyle = {
    height: `calc(100% - ${navbarHeight}px)`
  }
  return (
    <StateContext.Provider value={{ navbarHeight, handleSetNavbarHeight }}>

      <DashboardLayout>
        <section className='absolute right-0 w-[80%] bottom-0' style={myStyle}>
          <p>hello</p>
        </section>
      </DashboardLayout>
    </StateContext.Provider>
  )
}
