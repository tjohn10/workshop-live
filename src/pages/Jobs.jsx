// src/pages/Jobs.jsx
import React, {useEffect, useState} from 'react'
import api from '../api'
import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'

export default function Jobs(){
    const [jobs, setJobs] = useState([])
    useEffect(()=>{ api.getJobs().then(setJobs) },[])

    const advance = async (id)=>{
        const job = jobs.find(j=>j.id===id)
        const next = job.status === 'open' ? 'in_progress' : job.status === 'in_progress' ? 'ready' : 'completed'
        const updated = await api.updateJob(id, { status: next })
        setJobs(js=> js.map(j=> j.id===id ? updated : j))
    }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Jobs / Tickets</h2><Link to="/jobs/create" className="bg-indigo-600 text-white px-3 py-2 rounded">Create Job</Link></div>
            <div className="space-y-3">
                {jobs.map(j=> (
                    <div key={j.id} className="bg-white rounded shadow p-3 flex justify-between items-center">
                        <div>
                            <div className="font-semibold">{j.id} — {j.title}</div>
                            <div className="text-sm text-slate-500">{j.customerName || '—'} • {j.vehicle || '—'}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="text-sm">{j.status}</div>
                            <button onClick={()=>advance(j.id)} className="px-2 py-1 border rounded text-sm">Advance</button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}
