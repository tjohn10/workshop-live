// src/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'https://workshop-api-jurh.onrender.com/api'

async function request(path, { method='GET', body, raw=false } = {}) {
    const token = localStorage.getItem('authtoken') || localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = 'Bearer ' + token
    const res = await fetch(API_BASE + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    })
    const data = await res.json().catch(()=>null)
    if (!res.ok) throw data || { error: 'Network error' }
    return raw ? res : data
}

export default {
    // auth
    login: (body)=> request('/auth/login', { method:'POST', body }),
    register: (body)=> request('/auth/register', { method:'POST', body }),

    // inventory (backend endpoints)
    getInventory: ()=> request('/inventory'),
    createInventory: (body)=> request('/inventory', { method:'POST', body }),
    updateInventory: (id, body)=> request(`/inventory/${id}`, { method:'PUT', body }),
    deleteInventory: (id)=> request(`/inventory/${id}`, { method:'DELETE' }),

    // vehicles (frontend-only localStorage-based CRUD)
    getVehicles: ()=> Promise.resolve(JSON.parse(localStorage.getItem('vehicles')||'[]')),
    createVehicle: (v)=> {
        const list = JSON.parse(localStorage.getItem('vehicles')||'[]')
        v.id = Date.now()
        list.unshift(v)
        localStorage.setItem('vehicles', JSON.stringify(list))
        return Promise.resolve(v)
    },
    updateVehicle: (id, body)=> {
        const list = JSON.parse(localStorage.getItem('vehicles')||'[]')
        const idx = list.findIndex(x=>x.id===Number(id))
        if(idx!==-1){ list[idx] = {...list[idx], ...body}; localStorage.setItem('vehicles', JSON.stringify(list)); return Promise.resolve(list[idx]) }
        return Promise.reject({error:'not found'})
    },
    deleteVehicle: (id)=> {
        let list = JSON.parse(localStorage.getItem('vehicles')||'[]')
        list = list.filter(x=>x.id!==Number(id))
        localStorage.setItem('vehicles', JSON.stringify(list))
        return Promise.resolve({deleted:true})
    },

    // customers (localStorage)
    getCustomers: ()=> Promise.resolve(JSON.parse(localStorage.getItem('customers')||'[]')),
    createCustomer: (c)=> {
        const list = JSON.parse(localStorage.getItem('customers')||'[]')
        c.id = Date.now()
        list.unshift(c)
        localStorage.setItem('customers', JSON.stringify(list))
        return Promise.resolve(c)
    },
    updateCustomer: (id, body)=> {
        const list = JSON.parse(localStorage.getItem('customers')||'[]')
        const idx = list.findIndex(x=>x.id===Number(id))
        if(idx!==-1){ list[idx] = {...list[idx], ...body}; localStorage.setItem('customers', JSON.stringify(list)); return Promise.resolve(list[idx]) }
        return Promise.reject({error:'not found'})
    },
    deleteCustomer: (id)=> {
        let list = JSON.parse(localStorage.getItem('customers')||'[]')
        list = list.filter(x=>x.id!==Number(id))
        localStorage.setItem('customers', JSON.stringify(list))
        return Promise.resolve({deleted:true})
    },

    // jobs (localStorage repair tickets)
    getJobs: ()=> Promise.resolve(JSON.parse(localStorage.getItem('jobs')||'[]')),
    createJob: (j)=> {
        const list = JSON.parse(localStorage.getItem('jobs')||'[]')
        j.id = 'JOB-' + Date.now()
        j.created_at = new Date().toISOString()
        j.status = j.status || 'open'
        list.unshift(j)
        localStorage.setItem('jobs', JSON.stringify(list))
        return Promise.resolve(j)
    },
    updateJob: (id, body)=> {
        const list = JSON.parse(localStorage.getItem('jobs')||'[]')
        const idx = list.findIndex(x=>x.id===id)
        if(idx!==-1){ list[idx] = {...list[idx], ...body}; localStorage.setItem('jobs', JSON.stringify(list)); return Promise.resolve(list[idx]) }
        return Promise.reject({error:'not found'})
    },
    deleteJob: (id)=> {
        let list = JSON.parse(localStorage.getItem('jobs')||'[]')
        list = list.filter(x=>x.id!==id)
        localStorage.setItem('jobs', JSON.stringify(list))
        return Promise.resolve({deleted:true})
    },

    // invoices (localStorage mock)
    createInvoice: (inv)=> {
        const list = JSON.parse(localStorage.getItem('invoices')||'[]')
        inv.id = 'INV-' + Date.now()
        inv.status = 'pending'
        inv.created_at = new Date().toISOString()
        list.unshift(inv)
        localStorage.setItem('invoices', JSON.stringify(list))
        return Promise.resolve(inv)
    },
    getInvoices: ()=> Promise.resolve(JSON.parse(localStorage.getItem('invoices')||'[]')),
    payInvoice: (id)=> {
        const list = JSON.parse(localStorage.getItem('invoices')||'[]')
        const idx = list.findIndex(x=>x.id===id)
        if(idx!==-1){ list[idx].status = 'paid'; localStorage.setItem('invoices', JSON.stringify(list)); return Promise.resolve(list[idx]) }
        return Promise.reject({error:'not found'})
    }
}
