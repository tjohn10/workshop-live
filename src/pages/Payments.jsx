// src/pages/Payments.jsx
import React, {useEffect, useState} from 'react'
import api from '../api/api.js'
import DashboardLayout from '../layouts/DashboardLayout'

export default function Payments(){
    const [invoices, setInvoices] = useState([])
    const getInvoices = async () => {
        const res = await api.getInvoices()
        console.log(res, "data")
        if (res.status === true) {
            setInvoices(res.data)
        } else {
            setInvoices(null)
        }
    }
    useEffect(()=>{
       getInvoices()
    },[])

    const pay = async (id)=>{
        await api.payInvoice(id)
        setInvoices(prev=> prev.map(inv=> inv.id===id ? {...inv, status:'paid'} : inv))
        alert('Marked paid (mock)')
    }

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Invoices</h2></div>
            {
                invoices !== null ? (
                    <div className="space-y-3">
                        {invoices.map(inv=> (
                            <div key={inv.id} className="bg-white rounded shadow p-3 flex justify-between items-center">
                                <div>
                                    <div className="font-semibold">{inv.invoiceNumber}</div>
                                    <div className="text-sm text-slate-500">{inv.createdAt} — {inv.status}</div>
                                </div>
                                <div>
                                    <div className="font-semibold">{inv.invoiceNumber}</div>
                                    <div className="text-sm text-slate-500">{inv.createdAt} — {inv.status}</div>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <div className="font-bold">₦{Number(inv.total||0).toLocaleString()}</div>
                                    {inv.status !== 'paid' && <button onClick={()=>pay(inv.id)} className="px-3 py-1 bg-indigo-600 text-white rounded">Pay</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                       <h2 className="text-center">No Invoices Found</h2>
                    </div>
                )
            }

        </DashboardLayout>
    )
}
