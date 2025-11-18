import React from 'react'
import { Link } from 'react-router-dom'
export default function Landing(){
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Reliable car repairs — fast, transparent, and fair</h1>
          <p className="mb-6 text-slate-700">Book appointments, track progress, approve estimates, and pay online.</p>
          <div className="flex gap-3">
            <Link to="/book" className="px-4 py-2 rounded bg-indigo-600 text-white">Book Service</Link>
            <Link to="/dashboard" className="px-4 py-2 rounded border">My Dashboard</Link>
          </div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold mb-3">Quick booking</h3>
          <Link to="/book" className="px-3 py-2 bg-indigo-600 text-white rounded">Start booking</Link>
        </div>
      </div>
    </div>
  )
}
