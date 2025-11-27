import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="h-screen w-64 bg-gray-900 text-white left-0 top-0 shadow-xl">
            <div className="px-6 py-5 text-2xl font-bold border-b border-gray-700">
                AutoWorkshop
            </div>

            <nav className="mt-6">
                <Link className="block px-6 py-3 hover:bg-gray-700" to="/dashboard">
                    Dashboard
                </Link>
                <Link className="block px-6 py-3 hover:bg-gray-700" to="/inventory">
                    Inventory
                </Link>
                <Link className="block px-6 py-3 hover:bg-gray-700" to="/customers">
                    Customers
                </Link>
                <Link className="block px-6 py-3 hover:bg-gray-700" to="/jobs">
                    Jobs
                </Link>
                <Link className="block px-6 py-3 hover:bg-gray-700" to="/invoices">
                    Invoices
                </Link>
                <Link to="/admin/users" className="block px-6 py-3 hover:bg-gray-700">
                    Users
                </Link>
            </nav>
        </div>
    );
}
