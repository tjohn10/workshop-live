import React from 'react'
import DashboardLayout from "../layouts/DashboardLayout.jsx";
export default function Dashboard(){
  return (
      <DashboardLayout>
          <div className="container mx-auto py-8 px-4">
              <h2 className="text-2xl font-semibold mb-4">My Dashboard</h2>
              <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-2 bg-white p-4 rounded shadow">
                      <h3 className="font-semibold mb-3">Active Jobs</h3>
                      <div className="text-sm text-slate-500">(mock jobs placeholder)</div>
                  </div>
                  <div className="bg-white rounded shadow p-4">
                      <h4 className="font-semibold mb-2">Quick Actions</h4>
                      <ul className="space-y-2 text-sm">
                          <li>View service history</li>
                          <li>Make a payment (go to Payments)</li>
                          <li>Contact advisor</li>
                      </ul>
                  </div>
              </div>
          </div>
      </DashboardLayout>

  )
}
