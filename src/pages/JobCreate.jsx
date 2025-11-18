// src/pages/JobCreate.jsx
import React, {useState, useEffect} from 'react'
import api from '../api'
import DashboardLayout from '../layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'

export default function JobCreate(){
    const nav = useNavigate()
    const [form, setForm] = useState({ title:'', customerId:'', customerName:'', vehicle:'', notes:'', status:'open', estimate:0 })
    const [customers, setCustomers] = useState([])
    useEffect(()=>{ api.getCustomers().then(setCustomers) },[])

    const submit = async (e)=>{
        e.preventDefault()
        await api.createJob({ ...form, customerName: form.customerName || (customers.find(c=>c.id===Number(form.customerId))||{}).name })
        nav('/jobs')
    }

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-4">Create Job</h2>
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
                <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="p-2 border rounded" required />
                <select value={form.customerId} onChange={(e)=> setForm({...form, customerId: e.target.value}) } className="p-2 border rounded">
                    <option value="">Select customer</option>
                    {customers.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input value={form.vehicle} onChange={(e)=>setForm({...form,vehicle:e.target.value})} placeholder="Vehicle (plate/model)" className="p-2 border rounded" />
                <input type="number" value={form.estimate} onChange={(e)=>setForm({...form,estimate: Number(e.target.value)})} placeholder="Estimate" className="p-2 border rounded" />
                <textarea value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} placeholder="Notes" className="p-2 border rounded md:col-span-2" />
                <div className="md:col-span-2 flex justify-end"><button className="px-3 py-1 bg-indigo-600 text-white rounded">Create</button></div>
            </form>
        </DashboardLayout>
    )
}
