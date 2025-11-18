// src/layouts/DashboardLayout.jsx
import Sidebar from '../components/Sidebar'
import DarkToggle from '../components/DarkToggle'
import ToastProvider from '../components/Toast'

export default function DashboardLayout({ children }){
    return (
        <ToastProvider>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <div className="flex gap-3 items-center">
                            <DarkToggle />
                            <button onClick={()=>{ localStorage.removeItem('authtoken'); localStorage.removeItem('authuser'); location.href='/login' }} className="bg-red-500 text-white px-4 py-2 rounded-lg">Logout</button>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </ToastProvider>
    )
}
