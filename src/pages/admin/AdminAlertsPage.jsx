import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Bell } from 'lucide-react'

function AdminAlertsPage() {
    const alerts = [
        { id: 1, title: 'High CPU Usage Detected', severity: 'critical', time: '10 mins ago', message: 'Server CPU usage spiked to 92% for exceeding 5 minutes.' },
        { id: 2, title: 'New User Registration Spikes', severity: 'warning', time: '1 hour ago', message: 'Unusual number of sign-ups detected from IP range 192.168.x.x' },
        { id: 3, title: 'Database Backup Completed', severity: 'success', time: '3 hours ago', message: 'Daily automated backup finished successfully. Size: 45GB.' },
        { id: 4, title: 'API Latency Warning', severity: 'warning', time: '5 hours ago', message: 'Average API response time exceeded 500ms.' }
    ]

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'border-red-500/50 bg-red-500/10'
            case 'warning': return 'border-yellow-500/50 bg-yellow-500/10'
            case 'success': return 'border-green-500/50 bg-green-500/10'
            default: return 'border-white/10 bg-white/5'
        }
    }

    const getIcon = (severity) => {
        switch (severity) {
            case 'critical': return <AlertCircle className="w-6 h-6 text-red-500" />
            case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-500" />
            case 'success': return <CheckCircle className="w-6 h-6 text-green-500" />
            default: return <Bell className="w-6 h-6 text-white" />
        }
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                            <Bell className="w-8 h-8 text-red-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">System Alerts</h1>
                            <p className="text-white/70 text-lg">Critical notifications and warnings</p>
                        </div>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all">
                        Clear All
                    </button>
                </div>

                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`p-6 rounded-2xl border ${getSeverityColor(alert.severity)} transition-all`}>
                            <div className="flex items-start space-x-4">
                                <div className="mt-1">
                                    {getIcon(alert.severity)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-xl font-bold text-white">{alert.title}</h3>
                                        <span className="text-sm text-white/50">{alert.time}</span>
                                    </div>
                                    <p className="text-white/80">{alert.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default AdminAlertsPage
