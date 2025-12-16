import React from 'react'
import { Brain, User, Users, UserCircle, Shield, Palette } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { motion } from 'framer-motion'

function Header() {
  const location = useLocation()
  const { themes, changeTheme, currentTheme } = useTheme()
  const [showThemeMenu, setShowThemeMenu] = React.useState(false)
  
  const navItems = [
    { path: '/student', label: 'Student', icon: User },
    { path: '/teacher', label: 'Teacher', icon: Users },
    { path: '/parent', label: 'Parent', icon: UserCircle },
    { path: '/admin', label: 'Admin', icon: Shield }
  ]

  const quickThemes = ['cosmic', 'ocean', 'sunset', 'forest', 'midnight']

  return (
    <header className="bg-white/12 backdrop-blur-md border-b-2 border-white/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section - Enhanced */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-xl shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white text-shadow-md">UmangOS</h1>
              <p className="text-xs font-medium text-white/80 text-shadow-sm">by Hansraj</p>
            </div>
          </div>

          {/* Navigation - Enhanced Readability */}
          <nav className="flex items-center space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={\lex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-base transition-all duration-200 \\}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              )
            })}

            {/* Theme Quick Switch */}
            <div className="relative ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-base bg-white/10 text-white/85 hover:bg-white/20 hover:text-white border-2 border-white/20 hover:border-white/40 transition-all"
              >
                <Palette className="w-5 h-5" />
                <span className="hidden md:inline">Theme</span>
              </motion.button>

              {/* Theme Dropdown */}
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border-2 border-white/30 rounded-2xl shadow-2xl p-3 z-50"
                >
                  <div className="space-y-2">
                    <div className="text-white/70 text-xs font-bold uppercase px-3 py-1">Quick Themes</div>
                    {quickThemes.map((themeKey) => (
                      <motion.button
                        key={themeKey}
                        whileHover={{ scale: 1.02, x: 3 }}
                        onClick={() => {
                          changeTheme(themeKey)
                          setShowThemeMenu(false)
                        }}
                        className={\w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all \\}
                      >
                        <div
                          className="w-6 h-6 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: themes[themeKey].primary }}
                        />
                        <span className="text-white font-semibold text-sm">{themes[themeKey].name}</span>
                      </motion.button>
                    ))}
                    <div className="border-t border-white/20 my-2" />
                    <Link
                      to="/student/settings"
                      onClick={() => setShowThemeMenu(false)}
                      className="block w-full px-3 py-2 text-center text-white font-bold text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all"
                    >
                      More Options
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
