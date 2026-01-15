import React from 'react'
import { User, Activity, Brain, Clock } from 'lucide-react'

function ParentChildPage() {
    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                        <User className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">My Child</h1>
                        <p className="text-white/70 text-lg">Detailed overview of status and activity</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                                S
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Stormy Nubee</h2>
                                <p className="text-white/60">Class 12-A • Roll No. 42</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                                <span className="text-white/80">Attendance</span>
                                <span className="text-green-400 font-bold">92%</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                                <span className="text-white/80">Avg. Grade</span>
                                <span className="text-blue-400 font-bold">A-</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl flex items-center justify-between">
                                <span className="text-white/80">Assignments</span>
                                <span className="text-yellow-400 font-bold">3 Pending</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-effect rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-green-400" /> Current Status</h3>
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-white">Currently in <strong>Math Class</strong></p>
                            </div>
                            <p className="text-white/60 text-sm mt-2 ml-6">Emotion: <span className="text-green-400">Focused</span></p>
                        </div>

                        <div className="glass-effect rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Brain className="w-5 h-5 mr-2 text-purple-400" /> Recent Insight</h3>
                            <p className="text-white/80">Stormy has shown great improvement in Physics this week. Keep up the encouragement!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentChildPage
