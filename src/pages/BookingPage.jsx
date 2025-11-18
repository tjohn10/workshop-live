import React, {useState} from 'react'
export default function BookingPage(){
  const [booking, setBooking] = useState({ name:'', phone:'', vehicle:'', date:'', time:'', service:'Diagnosis' })
  const submit = (e) => { e.preventDefault(); alert('Appointment created (mock): '+JSON.stringify(booking)) }
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Book Service</h2>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <input value={booking.name} onChange={(e)=>setBooking({...booking,name:e.target.value})} placeholder="Full name" className="p-2 border rounded" required />
        <input value={booking.phone} onChange={(e)=>setBooking({...booking,phone:e.target.value})} placeholder="Phone" className="p-2 border rounded" required />
        <input value={booking.vehicle} onChange={(e)=>setBooking({...booking,vehicle:e.target.value})} placeholder="Vehicle (Plate / Model)" className="p-2 border rounded" required />
        <select value={booking.service} onChange={(e)=>setBooking({...booking,service:e.target.value})} className="p-2 border rounded">
          <option>Diagnosis</option>
          <option>Routine Service</option>
          <option>Engine Repair</option>
          <option>Bodywork</option>
        </select>
        <input type="date" value={booking.date} onChange={(e)=>setBooking({...booking,date:e.target.value})} className="p-2 border rounded" required />
        <input type="time" value={booking.time} onChange={(e)=>setBooking({...booking,time:e.target.value})} className="p-2 border rounded" required />
        <div className="md:col-span-2 flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create Booking</button>
        </div>
      </form>
    </div>
  )
}
