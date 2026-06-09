import type { Metadata } from 'next'
import './globals.css'
import SidebarWrapper from './components/SidebarWrapper'
import { ThemeProvider } from './context/ThemeContext'

export const metadata: Metadata = {
  title: 'FitDashboard',
  description: 'Tu app de rutinas y alimentación',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, display: 'flex', minHeight: '100vh' }}>
        <ThemeProvider>
          <SidebarWrapper />
          <main style={{ flex: 1, overflowY: 'auto' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}