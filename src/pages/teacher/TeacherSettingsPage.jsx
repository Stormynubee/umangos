import React from 'react'
import { Settings, Bell, Lock, User, Moon } from 'lucide-react'

function TeacherSettingsPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-500/20 p-3 rounded-xl border border-gray-500/30">
                        <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Settings</h1>
                        <p className="text-white/70 text-lg">Configure your teacher dashboard</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><User className="w-5 h-5 mr-2" /> Profile Settings</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white">Public Profile</span>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white">Email Notifications</span>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Bell className="w-5 h-5 mr-2" /> Alert Preferences</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white">Student Absence Alerts</span>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <span className="text-white">Low Performance Alerts</span>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherSettingsPage
