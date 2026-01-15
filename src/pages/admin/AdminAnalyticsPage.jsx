import React from 'react'
import { Activity, Server, Users, Database, Cpu, HardDrive } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

function AdminAnalyticsPage() {
    // Sample Data
    const trafficData = [
        { time: '00:00', users: 120, bandwidth: 45 },
        { time: '04:00', users: 80, bandwidth: 30 },
        { time: '08:00', users: 450, bandwidth: 70 },
        { time: '12:00', users: 980, bandwidth: 95 },
        { time: '16:00', users: 850, bandwidth: 85 },
        { time: '20:00', users: 340, bandwidth: 60 },
        { time: '23:59', users: 150, bandwidth: 40 }
    ]

    const resourceData = [
        { name: 'CPU', value: 45 },
        { name: 'RAM', value: 62 },
        { name: 'Storage', value: 28 },
        { name: 'Network', value: 35 }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                            <Activity className="w-8 h-8 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">System Analytics</h1>
                            <p className="text-white/70 text-lg">Real-time system performance monitoring</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 font-medium">System Operational</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <Server className="w-6 h-6 text-purple-400" />
                            <span className="text-xs font-semibold bg-purple-500/20 text-purple-400 px-2 py-1 rounded">HEALTHY</span>
                        </div>
                        <p className="text-white/60 text-sm">Server Uptime</p>
                        <p className="text-3xl font-bold text-white mt-1">99.98%</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-blue-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <Users className="w-6 h-6 text-blue-400" />
                            <span className="text-green-400 text-xs font-semibold">+12%</span>
                        </div>
                        <p className="text-blue-400/80 text-sm">Active Users</p>
                        <p className="text-3xl font-bold text-blue-400 mt-1">1,245</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-green-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <Database className="w-6 h-6 text-green-400" />
                            <span className="text-xs font-semibold bg-green-500/20 text-green-400 px-2 py-1 rounded">STABLE</span>
                        </div>
                        <p className="text-green-400/80 text-sm">Database Load</p>
                        <p className="text-3xl font-bold text-green-400 mt-1">32ms</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <HardDrive className="w-6 h-6 text-yellow-400" />
                            <span className="text-xs font-semibold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">OK</span>
                        </div>
                        <p className="text-yellow-400/80 text-sm">Storage Usage</p>
                        <p className="text-3xl font-bold text-yellow-400 mt-1">45%</p>
                    </div>
                </div>

                {/* Traffic Chart */}
                <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Traffic & Bandwidth</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="time" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Resource Usage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">System Resources</h3>
                        <div className="space-y-6">
                            {resourceData.map(resource => (
                                <div key={resource.name}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white">{resource.name}</span>
                                        <span className="text-white/70">{resource.value}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${resource.value > 80 ? 'bg-red-500' :
                                                    resource.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                                }`}
                                            style={{ width: `${resource.value}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Server Locations</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'US East (N. Virginia)', status: 'Operational', latency: '45ms' },
                                { name: 'EU West (Ireland)', status: 'Operational', latency: '82ms' },
                                { name: 'Asia Pacific (Mumbai)', status: 'Operational', latency: '12ms' },
                                { name: 'US West (Oregon)', status: 'Maintainance', latency: '--' }
                            ].map((server, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-2 h-2 rounded-full ${server.status === 'Operational' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                        <span className="text-white font-medium">{server.name}</span>
                                    </div>
                                    <span className="text-white/50 text-sm">{server.latency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminAnalyticsPage
