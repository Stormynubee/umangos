import React from 'react'
import { Settings, Shield, Database, Globe } from 'lucide-react'

function AdminSettingsPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-500/20 p-3 rounded-xl border border-gray-500/30">
                        <Settings className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">System Settings</h1>
                        <p className="text-white/70 text-lg">Global system configuration</p>
                    </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Shield className="w-5 h-5 mr-2" /> Security & Access</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-white font-semibold">Two-Factor Authentication</p>
                                <p className="text-white/50 text-sm">Enforce 2FA for all admin accounts</p>
                            </div>
                            <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">Enabled</button>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-white font-semibold">Session Timeout</p>
                                <p className="text-white/50 text-sm">Auto-logout after 30 minutes</p>
                            </div>
                            <select className="bg-black/20 text-white border border-white/10 rounded px-2 py-1">
                                <option>30 mins</option>
                                <option>1 hour</option>
                                <option>4 hours</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Database className="w-5 h-5 mr-2" /> Data & Maintenance</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-white font-semibold">System Backups</p>
                                <p className="text-white/50 text-sm">Automated daily backups</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg">Configure</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSettingsPage
