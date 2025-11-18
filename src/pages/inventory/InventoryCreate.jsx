import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function InventoryCreate() {
    const nav = useNavigate();
    const [form, setForm] = useState({ name: "", qty: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.createInventory(form);
        nav("/inventory");
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-6">Add Inventory</h2>

            <form onSubmit={handleSubmit} className="w-96">
                <input
                    type="text"
                    placeholder="Item Name"
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Create
                </button>
            </form>
        </DashboardLayout>
    );
}
