import React, {useEffect, useState} from 'react'
import api from '../api/api.js'
import DashboardLayout from "../layouts/DashboardLayout.jsx";

function formatCurrency(n){ return '₦' + Number(n).toLocaleString() }

export default function InventoryPage(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name:'', sku:'', qty:0, cost_price:0, selling_price:0 })
  const token = localStorage.getItem('authtoken')

  const fetchItems = async () => {
    setLoading(true)
    try{
      const data = await api.getInventory('/inventory', { token })
      setItems(data)
    }catch(err){
      alert(err?.error || 'Could not fetch')
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchItems() }, [])

  const create = async (e) => {
    e.preventDefault()
    try{
      const it = await api.createInventory(form)
      setItems(prev=>[it, ...prev])
      setForm({ name:'', sku:'', qty:0, cost_price:0, selling_price:0 })
    }catch(err){ alert(err?.error || 'create failed') }
  }

  const remove = async (id) => {
    if(!confirm('Delete item?')) return
    try{
      await api('/inventory/' + id, { method:'DELETE', token })
      setItems(prev=>prev.filter(p=>p.id !== id))
    }catch(err){ alert(err?.error || 'delete failed') }
  }

  return (
      <DashboardLayout>
          <div className="container mx-auto py-8 px-4">
              <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
              <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white rounded shadow p-4">
                      <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                              <thead className="text-left">
                              <tr><th>Name</th><th>Unit Price</th><th>Qty</th><th>Status</th><th></th></tr>
                              </thead>
                              <tbody>
                              {items.map(it=>(
                                  <tr key={it.id} className="border-t">
                                      <td>{it.name}</td>
                                      <td>{it.unitPrice}</td>
                                      <td>{it.quantity}</td>
                                      <td>{it.inventoryStatus}</td>
                                      <td><button onClick={()=>remove(it.id)} className="text-red-600 text-sm">Delete</button></td>
                                  </tr>
                              ))}
                              </tbody>
                          </table>
                      </div>
                  </div>

                  <div className="bg-white rounded shadow p-4">
                      <h4 className="font-semibold mb-2">Add Item</h4>
                      <form onSubmit={create} className="space-y-2 text-sm">
                          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" required />
                          <input value={form.sku} onChange={(e)=>setForm({...form,sku:e.target.value})} placeholder="SKU" className="w-full p-2 border rounded" />
                          <input type="number" value={form.qty} onChange={(e)=>setForm({...form,qty: Number(e.target.value) })} placeholder="Qty" className="w-full p-2 border rounded" />
                          <input type="number" value={form.cost_price} onChange={(e)=>setForm({...form,cost_price: Number(e.target.value) })} placeholder="Cost price" className="w-full p-2 border rounded" />
                          <input type="number" value={form.selling_price} onChange={(e)=>setForm({...form,selling_price: Number(e.target.value) })} placeholder="Selling price" className="w-full p-2 border rounded" />
                          <div className="flex justify-end">
                              <button className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
                          </div>
                          <div className="text-xs text-slate-500">Requires authentication. Login to get a token.</div>
                      </form>
                  </div>
              </div>
          </div>
      </DashboardLayout>
  )
}
