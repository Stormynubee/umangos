import React from 'react'
import { MessageSquare, User, Send } from 'lucide-react'

function ParentMessagesPage() {
    const messages = [
        { id: 1, sender: 'Mrs. Anderson', role: 'Math Teacher', preview: 'Stormy is doing excellent in calculus!', time: '2 hours ago', unread: true },
        { id: 2, sender: 'Mr. David', role: 'Class Teacher', preview: 'Regarding the upcoming field trip...', time: 'Yesterday', unread: false }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30">
                        <MessageSquare className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Messages</h1>
                        <p className="text-white/70 text-lg">Communications from school</p>
                    </div>
                </div>

                <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[600px]">
                    {/* Sidebar list */}
                    <div className="w-full md:w-1/3 border-r border-white/10 bg-white/5">
                        <div className="p-4 border-b border-white/10">
                            <input type="text" placeholder="Search messages..." className="w-full bg-black/20 text-white rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:border-green-400/50" />
                        </div>
                        <div className="overflow-y-auto h-full">
                            {messages.map(msg => (
                                <div key={msg.id} className={`p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer ${msg.unread ? 'bg-white/10' : ''}`}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-white font-bold">{msg.sender}</h4>
                                        <span className="text-xs text-white/50">{msg.time}</span>
                                    </div>
                                    <p className="text-xs text-green-400 mb-1">{msg.role}</p>
                                    <p className="text-white/70 text-sm truncate">{msg.preview}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col bg-black/20">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">Mrs. Anderson</h3>
                                <p className="text-white/50 text-sm">Math Teacher</p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                                    <p className="text-white">Hello! Just wanted to let you know Stormy is doing excellent in calculus!</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-green-500/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-green-500/30">
                                    <p className="text-white">That's wonderful to hear! Thank you for the update.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex items-center space-x-2">
                                <input type="text" placeholder="Type a message..." className="flex-1 bg-black/20 text-white rounded-xl px-4 py-3 border border-white/10 focus:outline-none focus:border-green-400/50" />
                                <button className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all"><Send className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentMessagesPage
