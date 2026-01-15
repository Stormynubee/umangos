import React from 'react'
import { FileText, Download, Calendar, Users } from 'lucide-react'

function TeacherReportsPage() {
    const reports = [
        { id: 1, name: 'Class 12-A Performance Summary', date: '2025-12-01', type: 'PDF' },
        { id: 2, name: 'Weekly Attendance Report', date: '2025-12-05', type: 'CSV' },
        { id: 3, name: 'Student Behavioral Analysis', date: '2025-11-28', type: 'PDF' }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center space-x-3">
                    <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
                        <FileText className="w-8 h-8 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white">Class Reports</h1>
                        <p className="text-white/70 text-lg">Generate and view student reports</p>
                    </div>
                </div>

                <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Available Reports</h3>
                    <div className="space-y-4">
                        {reports.map(report => (
                            <div key={report.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-lg">{report.name}</p>
                                        <p className="text-white/50 text-sm flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" /> {report.date}
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center space-x-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                    <Download className="w-4 h-4" />
                                    <span>Download {report.type}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherReportsPage
