import React, { useState } from 'react'
import { Users, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react'

function AdminUserManagementPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const users = [
        { id: 1, name: 'Hansraj Tiwari', role: 'Admin', email: 'hans@umangos.dev', status: 'Active', joined: 'Jan 2025' },
        { id: 2, name: 'Alice Teacher', role: 'Teacher', email: 'alice@school.edu', status: 'Active', joined: 'Feb 2025' },
        { id: 3, name: 'Bob Student', role: 'Student', email: 'bob@student.edu', status: 'Inactive', joined: 'Mar 2025' },
        { id: 4, name: 'Charlie Dean', role: 'Teacher', email: 'charlie@school.edu', status: 'Active', joined: 'Apr 2025' },
        { id: 5, name: 'David Lee', role: 'Teacher', email: 'david@school.edu', status: 'Active', joined: 'May 2025' }
    ]

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/30">
                            <Users className="w-8 h-8 text-green-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">User Management</h1>
                            <p className="text-white/70 text-lg">Manage system access and roles</p>
                        </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Add User</span>
                    </button>
                </div>

                {/* Search */}
                <div className="glass-effect rounded-2xl p-4 border border-white/10 flex items-center space-x-4">
                    <Search className="w-5 h-5 text-white/50" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none focus:outline-none text-white w-full"
                    />
                </div>

                {/* User Table */}
                <div className="glass-effect rounded-2xl border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 text-left border-b border-white/10">
                                <th className="p-4 text-white/60 font-medium">Name</th>
                                <th className="p-4 text-white/60 font-medium">Role</th>
                                <th className="p-4 text-white/60 font-medium">Status</th>
                                <th className="p-4 text-white/60 font-medium">Joined</th>
                                <th className="p-4 text-white/60 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-white/40 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' :
                                                user.role === 'Teacher' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-green-500/20 text-green-400'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white/70">{user.joined}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white"><Edit className="w-4 h-4" /></button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default AdminUserManagementPage
