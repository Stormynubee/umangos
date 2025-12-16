import React from 'react'
import { Heart, Shield, Code } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white/5 backdrop-blur-md border-t border-white/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-white/80">
            <Code className="w-4 h-4" />
            <span className="text-sm font-semibold">Developed by Hansraj</span>
          </div>

          <div className="flex items-center space-x-6 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>100% Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Wellbeing First</span>
            </div>
          </div>

          <div className="text-white/60 text-sm">
            © 2025 UmangOS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
