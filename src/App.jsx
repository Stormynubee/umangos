import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import PermissionScreen from './components/PermissionScreen'
import RoleSelection from './components/RoleSelection'
import Sidebar from './components/Sidebar'
import StudentDashboard from './dashboards/StudentDashboard'
import TeacherDashboard from './dashboards/TeacherDashboard'
import ParentDashboard from './dashboards/ParentDashboard'
import AdminDashboard from './dashboards/AdminDashboard'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  // Wrap entire app with ThemeProvider
  const [showSplash, setShowSplash] = useState(true)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [permissionsChecked, setPermissionsChecked] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userName, setUserName] = useState('')

  const handleSplashComplete = () => {
    console.log('Splash complete')
    setShowSplash(false)
  }

  const handlePermissionsGranted = () => {
    console.log('Permissions granted')
    setHasPermissions(true)
    setPermissionsChecked(true)
  }

  const handlePermissionsDenied = () => {
    console.log('Permissions denied')
    setHasPermissions(false)
    setPermissionsChecked(true)
  }

  const handleRoleSelect = (role, name) => {
    console.log('Role selected:', role, name)
    setUserRole(role)
    setUserName(name)
  }

  const handleLogout = () => {
    setUserRole(null)
    setUserName('')
    setShowSplash(true)
    setHasPermissions(false)
    setPermissionsChecked(false)
  }

  if (showSplash) {
    return <SplashScreen onContinue={handleSplashComplete} />
  }

  if (!permissionsChecked || !hasPermissions) {
    return (
      <PermissionScreen 
        onPermissionsGranted={handlePermissionsGranted}
        onPermissionsDenied={handlePermissionsDenied}
        isRetry={permissionsChecked && !hasPermissions}
      />
    )
  }

  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  return (
    <Router>
      <div className="flex min-h-screen gradient-primary">
        <Sidebar role={userRole} userName={userName} onLogout={handleLogout} />
        <div className="flex-1 lg:ml-72 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Navigate to={`/${userRole}`} replace />} />
            <Route path="/student/*" element={<StudentDashboard userName={userName} />} />
            <Route path="/teacher/*" element={<TeacherDashboard userName={userName} />} />
            <Route path="/parent/*" element={<ParentDashboard userName={userName} />} />
            <Route path="/admin/*" element={<AdminDashboard userName={userName} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
