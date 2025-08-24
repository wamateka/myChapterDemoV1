import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
import { Menu, X, User, Settings, LogOut, Bell, Calendar, Image, BookOpen, LayoutDashboard, Trophy } from "lucide-react";
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  // console.log(isAdmin)

  return (
    <nav className="bg-primary text-primary-content shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-ghost rounded-full flex items-center justify-center">
              <img src="/nsbeLogo.svg" alt="Logo" />
            </div>
            <span className="hidden sm:block font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-base-100 to-accent">
              S&T Chapter
            </span>
          </Link>

          {/* Center Nav Links — ICON + LABEL */}
          {user && <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="flex flex-col items-center group">
              <Calendar className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-xs mt-1 group-hover:text-secondary">Events</span>
            </Link>

            <Link to="/gallery" className="flex flex-col items-center group">
              <Image className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-xs mt-1 group-hover:text-secondary">Gallery</span>
            </Link>

            <Link to="/blogs" className="flex flex-col items-center group">
              <BookOpen className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-xs mt-1 group-hover:text-secondary">Blogs</span>
            </Link>

            <Link to="/dashboard" className="flex flex-col items-center group">
              <LayoutDashboard className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-xs mt-1 group-hover:text-secondary">Dashboard</span>
            </Link>

            <Link to="/leaderboard" className="flex flex-col items-center group">
              <Trophy className="w-6 h-6 group-hover:text-secondary transition-colors" />
              <span className="text-xs mt-1 group-hover:text-secondary">Leaderboard</span>
            </Link>
          </div>}

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="btn btn-ghost btn-circle relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 badge badge-secondary text-xs">
                    3
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <figure className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <img
                        className="rounded-full"
                        src={user.profile_picture}
                        alt="Profile"
                      />
                    </figure>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile" className="flex items-center text-primary">
                        <User className="w-4 h-4 mr-2" /> Profile
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to="/admin" className="flex items-center text-primary">
                          <Settings className="w-4 h-4 mr-2" /> Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-primary"
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {user && <button className="btn btn-ghost btn-circle relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 badge badge-secondary text-xs">
                3
              </span>
            </button>}
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
          <div className="md:hidden mt-2 space-y-2">
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
            >
              Events
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/blogs"
              className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
            >
              Blogs
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/leaderboard"
              className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
            >
              Leaderboard
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 rounded-md hover:text-secondary transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md hover:text-secondary transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            {!user && (
              <div className="flex space-x-2 px-3 py-2">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 