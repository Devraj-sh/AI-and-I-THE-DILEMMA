import './globals.css'
import { Inter, Orbitron } from 'next/font/google'
import { SoundProvider } from '@/components/hooks/useSound'
import { UserProgressProvider } from '@/components/hooks/useGameProgress'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata = {
  title: 'AI & I: THE DILEMMA',
  description: 'A gamified experience comparing human intelligence vs artificial intelligence',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} font-sans`}>
        <SoundProvider>
          <UserProgressProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </UserProgressProvider>
        </SoundProvider>
      </body>
    </html>
  )
}