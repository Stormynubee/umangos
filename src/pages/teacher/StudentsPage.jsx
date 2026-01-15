import React, { useState } from 'react'
import { Users, Search, Filter, MoreVertical, Mail, BarChart2, UserCheck, UserX } from 'lucide-react'

function StudentsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterClass, setFilterClass] = useState('All')

    // Sample Student Data
    const students = [
        { id: 1, name: 'Alice Johnson', class: '12-A', attendance: 95, status: 'Present', lastActive: '2 mins ago', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', class: '12-A', attendance: 88, status: 'Absent', lastActive: '1 day ago', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Davis', class: '12-B', attendance: 92, status: 'Present', lastActive: '5 mins ago', email: 'charlie@example.com' },
        { id: 4, name: 'Diana Evans', class: '12-A', attendance: 97, status: 'Present', lastActive: 'Just now', email: 'diana@example.com' },
        { id: 5, name: 'Ethan Hunt', class: '12-C', attendance: 85, status: 'Late', lastActive: '30 mins ago', email: 'ethan@example.com' },
        { id: 6, name: 'Fiona Gallagher', class: '12-B', attendance: 90, status: 'Present', lastActive: '1 hour ago', email: 'fiona@example.com' },
        { id: 7, name: 'George Miller', class: '12-C', attendance: 78, status: 'Absent', lastActive: '2 days ago', email: 'george@example.com' },
        { id: 8, name: 'Hannah Baker', class: '12-A', attendance: 94, status: 'Present', lastActive: '10 mins ago', email: 'hannah@example.com' }
    ]

    const classes = ['All', '12-A', '12-B', '12-C']

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesClass = filterClass === 'All' || student.class === filterClass
        return matchesSearch && matchesClass
    })

    // Stats
    const stats = {
        total: students.length,
        present: students.filter(s => s.status === 'Present').length,
        absent: students.filter(s => s.status === 'Absent').length,
        avgAttendance: Math.round(students.reduce((acc, curr) => acc + curr.attendance, 0) / students.length)
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                            <Users className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Students</h1>
                            <p className="text-white/70 text-lg">Manage class rosters and performance</p>
                        </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Add Student</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="glass-effect rounded-2xl p-6 border border-white/10">
                        <p className="text-white/60 text-sm font-medium">Total Students</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-green-500/30">
                        <p className="text-green-400/80 text-sm font-medium">Present Today</p>
                        <p className="text-3xl font-bold text-green-400 mt-2">{stats.present}</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-red-500/30">
                        <p className="text-red-400/80 text-sm font-medium">Absent Today</p>
                        <p className="text-3xl font-bold text-red-400 mt-2">{stats.absent}</p>
                    </div>
                    <div className="glass-effect rounded-2xl p-6 border border-blue-500/30">
                        <p className="text-blue-400/80 text-sm font-medium">Avg Attendance</p>
                        <p className="text-3xl font-bold text-blue-400 mt-2">{stats.avgAttendance}%</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="glass-effect rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500/50"
                        />
                    </div>

                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <Filter className="w-5 h-5 text-white/50" />
                        <div className="flex bg-white/5 rounded-lg p-1">
                            {classes.map(cls => (
                                <button
                                    key={cls}
                                    onClick={() => setFilterClass(cls)}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterClass === cls ? 'bg-purple-600 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {cls}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Student List */}
                <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-left">
                                    <th className="py-4 px-6 text-white/60 font-medium">Name</th>
                                    <th className="py-4 px-6 text-white/60 font-medium">Class</th>
                                    <th className="py-4 px-6 text-white/60 font-medium">Status</th>
                                    <th className="py-4 px-6 text-white/60 font-medium">Attendance</th>
                                    <th className="py-4 px-6 text-white/60 font-medium">Last Active</th>
                                    <th className="py-4 px-6 text-white/60 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map(student => (
                                        <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{student.name}</p>
                                                        <p className="text-white/40 text-xs">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-sm">
                                                    {student.class}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${student.status === 'Present' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        student.status === 'Absent' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                    }`}>
                                                    {student.status === 'Present' && <UserCheck className="w-3 h-3" />}
                                                    {student.status === 'Absent' && <UserX className="w-3 h-3" />}
                                                    {student.status}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-green-500' :
                                                                    student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                                                }`}
                                                            style={{ width: `${student.attendance}%` }}
                                                        />
                                                    </div>
                                                    <span className={`text-sm font-medium ${student.attendance >= 90 ? 'text-green-400' :
                                                            student.attendance >= 75 ? 'text-yellow-400' : 'text-red-400'
                                                        }`}>
                                                        {student.attendance}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-white/60 text-sm">
                                                {student.lastActive}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                                                        <Mail className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                                                        <BarChart2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-white/50">
                                            No students found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StudentsPage
