import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import ThemeProvider from './theme-provider'

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Kanban task management web app',
  description: 'This is a solution to the Kanban task management web app challenge on Frontend Mentor',
}

/**
 * Renders the root layout of the application.
 *
 * @param {Object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @return {React.ReactNode} The rendered root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}