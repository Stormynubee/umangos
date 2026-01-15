import React from 'react'
import { FileText, Download, Filter, Calendar } from 'lucide-react'

function AdminReportsPage() {
    const reports = [
        { id: 1, name: 'Monthly System Audit', date: '2025-12-01', type: 'PDF', size: '2.4 MB' },
        { id: 2, name: 'User Activity Log', date: '2025-12-05', type: 'CSV', size: '856 KB' },
        { id: 3, name: 'Security Breach Analysis', date: '2025-11-20', type: 'PDF', size: '1.2 MB' },
        { id: 4, name: 'Performance Metrics Q4', date: '2025-12-10', type: 'XLSX', size: '4.1 MB' },
        { id: 5, name: 'Attendance Summary', date: '2025-12-15', type: 'PDF', size: '3.3 MB' }
    ]

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
                            <FileText className="w-8 h-8 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-white">Reports</h1>
                            <p className="text-white/70 text-lg">System-wide reports and logs</p>
                        </div>
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-all flex items-center space-x-2">
                        <Filter className="w-5 h-5" />
                        <span>Generate New Report</span>
                    </button>
                </div>

                <div className="glass-effect rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Reports</h3>
                    <div className="space-y-4">
                        {reports.map(report => (
                            <div key={report.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all group">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white/10 p-3 rounded-lg">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-lg">{report.name}</p>
                                        <p className="text-white/50 text-sm flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" /> {report.date} • {report.size}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 rounded bg-white/10 text-white/70 text-sm font-medium">{report.type}</span>
                                    <button className="p-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminReportsPage
