import React from 'react'
import { Link } from 'react-router-dom'
export default function NavBar(){
  const token = typeof window !== 'undefined' ? localStorage.getItem('authtoken') : null
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">AutoShop</Link>
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/book" className="hover:underline">Book Service</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/inventory" className="hover:underline">Inventory</Link>
          <Link to="/payment" className="hover:underline">Payments</Link>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/payments">Payments</Link>
            {/*{token ? <div>{user?.name} ({user?.role})</div> : <Link to="/login">Login</Link>}*/}

            {token ? <button onClick={()=>{ localStorage.removeItem('authtoken'); localStorage.removeItem('authuser'); window.location.reload() }} className="ml-2 text-sm border px-2 py-1 rounded">Logout</button> : <Link to="/login" className="ml-2 text-sm border px-2 py-1 rounded">Login</Link>}
        </div>
      </div>
    </nav>
  )
}
