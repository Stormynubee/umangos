import React from 'react'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'

function ParentCalendarPage() {
    const events = [
        { id: 1, title: 'Parent-Teacher Meeting', date: '2026-01-20', time: '10:00 AM', location: 'Room 204' },
        { id: 2, title: 'Math Final Exam', date: '2026-01-25', time: '09:00 AM', location: 'Exam Hall A' },
        { id: 3, title: 'Science Fair', date: '2026-02-05', time: '11:00 AM', location: 'Auditorium' }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-500/30">
                        <CalendarIcon className="w-8 h-8 text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Calendar</h1>
                        <p className="text-white/70 text-lg">Upcoming events and important dates</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => (
                        <div key={event.id} className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-pink-500/20 text-pink-400 font-bold px-3 py-1 rounded-lg text-sm">
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <div className="space-y-2 text-white/60 text-sm">
                                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {event.time}</div>
                                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {event.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ParentCalendarPage
