import React from 'react'
import { Settings, Bell, Lock, User } from 'lucide-react'

function ParentSettingsPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-500/20 p-3 rounded-xl border border-gray-500/30">
                        <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Settings</h1>
                        <p className="text-white/70 text-lg">Manage your account preferences</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Bell className="w-5 h-5 mr-2" /> Notifications</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div>
                                    <span className="text-white block font-medium">Daily Summary</span>
                                    <span className="text-white/50 text-xs">Receive daily wellbeing reports</span>
                                </div>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div>
                                    <span className="text-white block font-medium">Exam Alerts</span>
                                    <span className="text-white/50 text-xs">Get notified about upcoming exams</span>
                                </div>
                                <div className="w-10 h-6 bg-green-500 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Lock className="w-5 h-5 mr-2" /> Security</h3>
                        <div className="space-y-4">
                            <button className="w-full text-left p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-all">Change Password</button>
                            <button className="w-full text-left p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-all">Two-Factor Authentication</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentSettingsPage
