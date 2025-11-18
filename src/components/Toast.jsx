// src/components/Toast.jsx
import React, { createContext, useContext, useState } from 'react'

const ToastContext = createContext()
export function useToast(){ return useContext(ToastContext) }

export function ToastProvider({ children }){
    const [toasts, setToasts] = useState([])
    const push = (msg, opts={})=>{
        const id = Date.now() + Math.random().toString(36).slice(2,7)
        setToasts(t=>[...t, { id, msg, ...opts }])
        setTimeout(()=> setToasts(t=> t.filter(x=>x.id!==id)), opts.duration||3500)
    }
    return (
        <ToastContext.Provider value={{ push }}>
            {children}
            <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">
                {toasts.map(t=>(
                    <div key={t.id} className="bg-black text-white px-4 py-2 rounded shadow">{t.msg}</div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
export default ToastProvider
