import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  //   const { user, logout, isAdmin } = useAuth()
  const { user, logout } = useAuth()
  const isAdmin = true; // Placeholder for admin state   
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-primary text-primary-content shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-20 h-20 bg-ghost rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-base"><img src="../../public/nsbeLogo.svg" alt="" /></span>
              </div>
              <span className="font-semibold font-mono tracking-widest text-2xl 
                    bg-clip-text text-transparent bg-gradient-to-r from-base-100 to-accent">
                S&T Chapter</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">


            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/events" className="hover:text-secondary transition-colors">
                  Events
                </Link>
                <Link to="/gallery" className="hover:text-secondary transition-colors">
                  Gallery
                </Link>
                <Link to="/blogs" className="hover:text-secondary transition-colors">
                  Blog
                </Link>
                <Link to="/dashboard" className="hover:text-secondary transition-colors">
                  Dashboard
                </Link>
                <Link to="/leaderboard" className="hover:text-secondary transition-colors">
                  Leaderboard
                </Link>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <figure className='w-8 h-8 rounded-full bg-secondary flex items-center justify-center'>
                      <img className="rounded-full" src={user.profile_picture} alt="" />
                    </figure>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                    <li>
                      <Link to="/dashboard" className="flex items-center text-primary">
                        <User className="w-4 h-4  text-base" />
                        Profile
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to="/admin" className="flex items-center text-primary">
                          <Settings className="w-4 h-4 " />
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout} className="flex items-center text-primary">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-square"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/events"
                className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-primary rounded-md hover:text-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md hover:text-secondary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2 pt-2">
                  <Link
                    to="/login"
                    className="btn btn-ghost btn-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 