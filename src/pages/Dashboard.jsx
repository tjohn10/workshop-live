import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar.jsx";
import Sidebar from "../components/Sidebar";

import { Line, Doughnut, Bar, Pie } from "react-chartjs-2";
import api from "../api/api.js";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [invoiceRev, setInvoiceRev] = useState([]);
    const [invoiceStats, setInvoiceStats] = useState([]);
    const [customerStats, setCustomerStats] = useState(null);
    const [recentInvoices, setRecentInvoices] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const inv = await api.getMonthlyStats();
        const invStats = await api.getStats();
        const cust = await api.getCustomerStats();
        const recent = await api.getInvoices();

        setInvoiceRev(inv.data)
        setInvoiceStats(invStats.data);
        setCustomerStats(cust);
        setRecentInvoices(recent.data);

        console.log(invoiceRev, 'invoice')
        console.log(invStats, 'invoice stat')
        console.log(cust, 'customer')
    }

    // if (!invoiceStats || !customerStats) {
    //     return <div className="ml-64 p-6">Loading...</div>;
    // }

    // CHART DATA
    const revenueLine = {
        labels: invoiceRev.map((m) => m.month),
        datasets: [{
            label: "Revenue",
            data: invoiceRev.map((m) => m.totalRevenue),
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.3)",
            tension: 0.4
        }]
    };

    const invoiceStatus = {
        labels: invoiceStats.map((s) => s.status),
        datasets: [{
            data: invoiceStats.map((s) => s.count),
            backgroundColor: ["#22c55e", "#ef4444"]
        }]
    };

    // const customerGrowth = {
    //     labels: customerStats.map(m => m.month),
    //     datasets: [{
    //         label: "New Customers",
    //         data: customerStats.map(m => m.count),
    //         backgroundColor: "#6366f1"
    //     }]
    // };
    //
    // const topCustomers = {
    //     labels: customerStats.map(c => c.name),
    //     datasets: [{
    //         label: "Revenue",
    //         data: customerStats.map(c => c.totalSpent),
    //         backgroundColor: ["#3b82f6", "#10b981", "#f97316", "#eab308", "#ef4444"]
    //     }]
    // };


    return (
        <DashboardLayout>


            <div className="ml-64 p-6 space-y-6">

                {/* KPI CARDS */}
                {/*<div className="grid grid-cols-1 md:grid-cols-4 gap-6">*/}

                {/*    <div className="p-6 bg-white rounded-lg shadow">*/}
                {/*        <p className="text-gray-500">Total Revenue</p>*/}
                {/*        <p className="text-3xl font-bold">*/}
                {/*            ₦{invoiceRev.totalRevenue.toLocaleString()}*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*    <div className="p-6 bg-white rounded-lg shadow">*/}
                {/*        <p className="text-gray-500">Paid Invoices</p>*/}
                {/*        <p className="text-3xl font-bold">{invoiceStats.countPaid}</p>*/}
                {/*    </div>*/}

                {/*    <div className="p-6 bg-white rounded-lg shadow">*/}
                {/*        <p className="text-gray-500">Total Customers</p>*/}
                {/*        <p className="text-3xl font-bold">*/}
                {/*            {customerStats.totalCustomers}*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*    <div className="p-6 bg-white rounded-lg shadow">*/}
                {/*        <p className="text-gray-500">New Customers (This Month)</p>*/}
                {/*        <p className="text-3xl font-bold">*/}
                {/*            {customerStats.newCustomersByMonth.slice(-1)[0].count}*/}
                {/*        </p>*/}
                {/*    </div>*/}

                {/*</div>*/}

                {/* CHART SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white p-6 shadow rounded-lg">
                        <h3 className="font-semibold mb-3">Revenue Trend</h3>
                        <Line data={revenueLine} height={130} />
                    </div>

                    <div className="bg-white p-6 shadow rounded-lg">
                        <h3 className="font-semibold mb-3">Invoice Status</h3>
                        <Doughnut data={invoiceStatus} height={130} />
                    </div>

                    {/*<div className="bg-white p-6 shadow rounded-lg">*/}
                    {/*    <h3 className="font-semibold mb-3">New Customers</h3>*/}
                    {/*    <Bar data={customerGrowth} height={130} />*/}
                    {/*</div>*/}

                    {/*<div className="bg-white p-6 shadow rounded-lg">*/}
                    {/*    <h3 className="font-semibold mb-3">Top Customers</h3>*/}
                    {/*    <Pie data={topCustomers} height={130} />*/}
                    {/*</div>*/}

                </div>

                {/* RECENT INVOICES TABLE */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">Recent Invoices</h3>

                    <table className="w-full text-left">
                        <thead>
                        <tr className="border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Customer</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recentInvoices.map((inv) => (
                            <tr key={inv.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{inv.id}</td>
                                <td className="py-2">{inv.customer?.name}</td>
                                <td className="py-2">₦{inv.total.toLocaleString()}</td>
                                <td className="py-2 capitalize">{inv.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </DashboardLayout>
    );
}
