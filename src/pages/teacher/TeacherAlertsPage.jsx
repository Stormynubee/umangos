import React from 'react'
import { Activity, AlertCircle, Bell, User } from 'lucide-react'

function TeacherAlertsPage() {
    const alerts = [
        { id: 1, student: 'Alice Johnson', message: 'Absent for 3 consecutive days', severity: 'high', time: '2 hours ago' },
        { id: 2, student: 'Bob Smith', message: 'Declining academic performance in Math', severity: 'medium', time: '1 day ago' },
        { id: 3, student: 'Class 12-B', message: 'Low engagement detected in last session', severity: 'low', time: 'Yesterday' }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                        <Activity className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Student Alerts</h1>
                        <p className="text-white/70 text-lg">Attention required notifications</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`p-6 rounded-2xl border ${alert.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
                                alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                    'bg-blue-500/10 border-blue-500/30'
                            }`}>
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/10 p-3 rounded-full">
                                    <Bell className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center">
                                                {alert.student}
                                                <span className={`ml-3 text-xs px-2 py-0.5 rounded-full uppercase ${alert.severity === 'high' ? 'bg-red-500 text-white' :
                                                        alert.severity === 'medium' ? 'bg-yellow-500 text-black' :
                                                            'bg-blue-500 text-white'
                                                    }`}>{alert.severity}</span>
                                            </h3>
                                            <p className="text-white/80 mt-1">{alert.message}</p>
                                        </div>
                                        <span className="text-white/50 text-sm">{alert.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeacherAlertsPage
