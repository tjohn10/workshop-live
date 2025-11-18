import React from 'react'
export default function Footer(){
  return (
    <footer className="mt-12 py-6 bg-slate-50 text-slate-700">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} AutoShop — Built with ❤️
      </div>
    </footer>
  )
}
