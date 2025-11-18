// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">AutoMech</h2>
            <nav className="flex flex-col gap-4">
                <Link to="/inventory" className="hover:text-blue-400">Inventory</Link>
                <Link to="/vehicles" className="hover:text-blue-400">Vehicles</Link>
                <Link to="/customers" className="hover:text-blue-400">Customers</Link>
                <Link to="/jobs" className="hover:text-blue-400">Jobs</Link>
                <Link to="/payments" className="hover:text-blue-400">Payments</Link>
            </nav>
        </div>
    );
}
