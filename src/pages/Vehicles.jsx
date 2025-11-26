// src/pages/Vehicles.jsx
import React, {useEffect, useState} from 'react'
import api from '../api/api.js'
import DashboardLayout from '../layouts/DashboardLayout'
import {useToast} from '../components/Toast'

export default function Vehicles() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({regNumber: '', model: '', ownerName: '', ownerPhone: ''})
    const toast = useToast()

    const getVehicles = async () => {
        setLoading(true)
        const res =await api.getVehicles()
        console.log(res, "data")
        if (res.status === true) {
            setList(res.data)
        } else {
            setList(null)
        }
    }
    useEffect( () => {
        getVehicles()
    }, [])

    const add = async (e) => {
        e.preventDefault();
        const v = await api.createVehicle(form);
        setList([v, ...list]);
        setForm({regNumber: '', model: '', ownerName: '', ownerPhone: ''});
        toast.push('Vehicle added')
    }
    const remove = async (id) => {
        if (!confirm('Delete?')) return;
        await api.deleteVehicle(id);
        setList(list.filter(x => x.id !== id));
        toast.push('Deleted')
    }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Vehicles</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded shadow p-4">
                    <table className="w-full text-sm">
                        <thead className="text-left">
                        <tr>
                            <th>Plate</th>
                            <th>Model</th>
                            <th>Owner Name</th>
                            <th>Owner Phone</th>
                            <th></th>
                        </tr>
                        </thead>
                        {
                            list !== null ? (
                                <tbody>
                                {
                                    list.map(v => (
                                        <tr key={v.id} className="border-t">
                                            <td className="p-2">{v.regNumber}</td>
                                            <td>{v.model}</td>
                                            <td>{v.ownerName}</td>
                                            <td>{v.ownerPhone}</td>
                                            <td>
                                                <button onClick={() => remove(v.id)} className="text-red-600">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr><td>No Vehicles Found</td></tr>
                                </tbody>
                            )
                        }

                    </table>
                </div>

                <div className="bg-white rounded shadow p-4">
                    <h4 className="font-semibold mb-2">Add Vehicle</h4>
                    <form onSubmit={add} className="space-y-2">
                        <input value={form.regNumber} onChange={(e) => setForm({...form, regNumber: e.target.value})}
                               placeholder="Plate" className="w-full p-2 border rounded" required/>
                        <input value={form.model} onChange={(e) => setForm({...form, model: e.target.value})}
                               placeholder="Model" className="w-full p-2 border rounded"/>
                        <input value={form.ownerName} onChange={(e) => setForm({...form, ownerName: e.target.value})}
                               placeholder="Owner Name" type="tel" className="w-full p-2 border rounded"/>
                        <input value={form.ownerPhone} onChange={(e) => setForm({...form, OwnerPhone: e.target.value})}
                               placeholder="Owner Phone" className="w-full p-2 border rounded"/>
                        <div className="flex justify-end">
                            <button className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
