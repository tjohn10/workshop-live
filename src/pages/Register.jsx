// src/pages/Register.jsx
import React, {useState} from 'react'
import api from '../api/api.js'
import { useNavigate } from 'react-router-dom'

export default function Register(){
    const nav = useNavigate()
    const [form, setForm] = useState({ name:'', email:'', password:'' })
    const submit = async (e)=>{
        e.preventDefault()
        const res = await api.register(form)
        if(res.token){ localStorage.setItem('authtoken', res.token); localStorage.setItem('authuser', JSON.stringify(res.user)); nav('/dashboard') }
        else alert(res.error || 'Registration failed')
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={submit} className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input className="w-full p-2 border rounded mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
                <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
                <div className="flex justify-end"><button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button></div>
            </form>
        </div>
    )
}
