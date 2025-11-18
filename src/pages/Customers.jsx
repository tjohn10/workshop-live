// src/pages/Customers.jsx
import React, {useEffect, useState} from 'react'
import api from '../api'
import DashboardLayout from '../layouts/DashboardLayout'
import { useToast } from '../components/Toast'

export default function Customers(){
    const [list, setList] = useState([])
    const [form, setForm] = useState({ name:'', phone:'' })
    const toast = useToast()

    useEffect(()=>{ api.getCustomers().then(setList) },[])

    const add = async (e)=>{ e.preventDefault(); const r = await api.createCustomer(form); setList([r,...list]); setForm({name:'',phone:''}); toast.push('Customer added') }
    const remove = async (id)=>{ if(!confirm('Delete?')) return; await api.deleteCustomer(id); setList(list.filter(x=>x.id!==id)); toast.push('Deleted') }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Customers</h2></div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded shadow p-4">
                    <table className="w-full text-sm">
                        <thead className="text-left"><tr><th>Name</th><th>Phone</th><th></th></tr></thead>
                        <tbody>{list.map(c=> (<tr key={c.id} className="border-t"><td className="p-2">{c.name}</td><td>{c.phone}</td><td><button onClick={()=>remove(c.id)} className="text-red-600">Delete</button></td></tr>))}</tbody>
                    </table>
                </div>

                <div className="bg-white rounded shadow p-4">
                    <h4 className="font-semibold mb-2">Add Customer</h4>
                    <form onSubmit={add} className="space-y-2">
                        <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" required />
                        <input value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder="Phone" className="w-full p-2 border rounded" />
                        <div className="flex justify-end"><button className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button></div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
