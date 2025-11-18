import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

/*
Mock Payment Page
- Shows invoice summary
- Lets user choose provider (Paystack / Flutterwave)
- Simulates a payment flow (no external network calls)
*/

function formatCurrency(n){ return '₦' + Number(n).toLocaleString() }

export default function PaymentPage(){
  const navigate = useNavigate()
  const [provider, setProvider] = useState('paystack')
  const [processing, setProcessing] = useState(false)
  const invoice = {
    id: 'INV-2025-001',
    items: [
      { desc: 'Engine diagnostic', price: 5000 },
      { desc: 'Piston rings (parts)', price: 25000 },
      { desc: 'Labour', price: 15000 },
    ],
    taxPercent: 7.5
  }
  const subtotal = invoice.items.reduce((s,i)=>s+i.price,0)
  const tax = subtotal * (invoice.taxPercent/100)
  const total = Math.round(subtotal + tax)

  const pay = async () => {
    setProcessing(true)
    // simulate network + redirect to payment gateway
    await new Promise(r=>setTimeout(r, 1200))
    // Simulate success callback
    setProcessing(false)
    alert('Payment successful (mock) — ' + formatCurrency(total))
    navigate('/dashboard')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Pay Invoice</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded shadow p-4">
          <div className="mb-4">
            <div className="text-sm text-slate-500">Invoice</div>
            <div className="font-semibold">{invoice.id}</div>
          </div>
          <ul className="divide-y">
            {invoice.items.map((it,idx)=>(
              <li key={idx} className="py-2 flex justify-between">
                <div>{it.desc}</div><div>{formatCurrency(it.price)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-sm">
            <div className="flex justify-between"><div>Subtotal</div><div>{formatCurrency(subtotal)}</div></div>
            <div className="flex justify-between"><div>Tax ({invoice.taxPercent}%)</div><div>{formatCurrency(tax)}</div></div>
            <div className="flex justify-between font-bold text-lg mt-2"><div>Total</div><div>{formatCurrency(total)}</div></div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h4 className="font-semibold mb-2">Payment</h4>
          <div className="mb-3">
            <label className="block text-sm mb-1">Choose Provider</label>
            <select value={provider} onChange={(e)=>setProvider(e.target.value)} className="w-full p-2 border rounded">
              <option value="paystack">Paystack (mock)</option>
              <option value="flutterwave">Flutterwave (mock)</option>
            </select>
          </div>

          <button onClick={pay} disabled={processing} className="w-full px-4 py-2 bg-indigo-600 text-white rounded">
            {processing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
          </button>

          <div className="mt-4 text-xs text-slate-500">
            This is a mock payment flow. To integrate a real provider, replace the <code>pay</code> function with provider SDK calls and secure server-side verification.
          </div>
        </div>
      </div>
    </div>
  )
}
