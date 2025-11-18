// src/components/DarkToggle.jsx
import React, { useEffect, useState } from 'react'
export default function DarkToggle(){
    const [dark, setDark] = useState(localStorage.getItem('dark')==='1')
    useEffect(()=>{
        document.documentElement.classList.toggle('dark', dark)
        localStorage.setItem('dark', dark? '1':'0')
    },[dark])
    return <button onClick={()=>setDark(d=>!d)} className="px-3 py-1 border rounded text-sm">{dark? 'Light':'Dark'}</button>
}
