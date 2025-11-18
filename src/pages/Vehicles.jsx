// src/pages/Vehicles.jsx
import React, { useEffect, useState } from 'react'
import api from '../api'
import DashboardLayout from '../layouts/DashboardLayout'
import { useToast } from '../components/Toast'

export default function Vehicles(){
    const [list, setList] = useState([])
    const [form, setForm] = useState({ plate:'', model:'', year:'' })
    const toast = useToast()

    useEffect(()=>{ api.getVehicles().then(setList) },[])

    const add = async (e)=>{ e.preventDefault(); const v = await api.createVehicle(form); setList([v,...list]); setForm({plate:'',model:'',year:''}); toast.push('Vehicle added') }
    const remove = async (id)=>{ if(!confirm('Delete?')) return; await api.deleteVehicle(id); setList(list.filter(x=>x.id!==id)); toast.push('Deleted') }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Vehicles</h2></div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded shadow p-4">
                    <table className="w-full text-sm">
                        <thead className="text-left"><tr><th>Plate</th><th>Model</th><th>Year</th><th></th></tr></thead>
                        <tbody>{list.map(v=> (<tr key={v.id} className="border-t"><td className="p-2">{v.plate}</td><td>{v.model}</td><td>{v.year}</td><td><button onClick={()=>remove(v.id)} className="text-red-600">Delete</button></td></tr>))}</tbody>
                    </table>
                </div>

                <div className="bg-white rounded shadow p-4">
                    <h4 className="font-semibold mb-2">Add Vehicle</h4>
                    <form onSubmit={add} className="space-y-2">
                        <input value={form.plate} onChange={(e)=>setForm({...form,plate:e.target.value})} placeholder="Plate" className="w-full p-2 border rounded" required />
                        <input value={form.model} onChange={(e)=>setForm({...form,model:e.target.value})} placeholder="Model" className="w-full p-2 border rounded" />
                        <input value={form.year} onChange={(e)=>setForm({...form,year:e.target.value})} placeholder="Year" className="w-full p-2 border rounded" />
                        <div className="flex justify-end"><button className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button></div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
