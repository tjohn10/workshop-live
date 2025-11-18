import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function InventoryEdit() {
    const { id } = useParams();
    const nav = useNavigate();

    const [form, setForm] = useState({ name: "", qty: "" });

    useEffect(() => {
        api.getInventory().then((items) => {
            const item = items.find((x) => x.id === parseInt(id));
            if (item) setForm(item);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.updateInventory(id, form);
        nav("/inventory");
    };

    return (
        <DashboardLayout>
            <h2 className="text-xl font-bold mb-6">Edit Inventory</h2>

            <form onSubmit={handleSubmit} className="w-96">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={form.name}
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={form.qty}
                    className="w-full p-2 border rounded mb-4"
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save Changes
                </button>
            </form>
        </DashboardLayout>
    );
}
