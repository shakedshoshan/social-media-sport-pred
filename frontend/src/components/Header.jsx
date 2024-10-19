import { useState } from 'react'
import { LogOut, Menu, TrendingUp, Table, Home } from "lucide-react"
import LogoutButton from './logoutButton.jsx' 


export default function Header({ userName = "John Doe", userImage = "/vite.svg" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
 
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-primary-foreground shadow-lg bg-[#141d4d] fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center space-x-4">
            <a href="/">
            <h1 className="text-3xl text-white font-bold font-serif tracking-wide">GuessZone</h1>
            </a>
            
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="/predictions" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
              <TrendingUp size={20} />
              <span>Predictions</span>
            </a>
            <a href="/mytables" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
              <Table size={20} />
              <span>My Tables</span>
            </a>
            <a href="/profile" className="flex items-center space-x-3 group hover:cursor-pointer hover:bg-[#26337e] hover:rounded-lg p-2">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-foreground/30 transition-all duration-300 group-hover:ring-primary-foreground/60">
                <img
                  src={userImage}
                  alt={`${userName}'s profile`}
                  width={40}
                  height={40}
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg text-white font-medium">{userName}</span>
              </div>
            </a>
            <LogoutButton />
          </div>

          {/* Mobile menu button */}
          <button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-4 py-4 border-t border-primary-foreground/10 md:hidden">
            <div className="flex flex-col space-y-4">
              <a href="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
                <Home size={20} />
                <span>Home</span>
              </a>
              <a href="/predictions" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
                <TrendingUp size={20} />
                <span>Predictions</span>
              </a>
              <a href="/mytables" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
                <Table size={20} />
                <span>My Tables</span>
              </a>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={userImage}
                      alt={`${userName}'s profile`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{userName}</span>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}