import { useEffect, useState } from "react";
import { api } from "../../api/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function InventoryList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.getInventory().then(setItems);
    }, []);

    return (
        <DashboardLayout>
            <div className="flex justify-between mb-6">
                <h2 className="text-xl font-bold">Inventory</h2>

                <Link
                    to="/inventory/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add New
                </Link>
            </div>

            <table className="w-full border">
                <thead className="bg-gray-200">
                <tr>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Qty</th>
                    <th className="p-3 border">Actions</th>
                </tr>
                </thead>

                <tbody>
                {items.map((i) => (
                    <tr key={i.id}>
                        <td className="p-3 border">{i.name}</td>
                        <td className="p-3 border">{i.qty}</td>
                        <td className="p-3 border">
                            <Link
                                to={`/inventory/${i.id}`}
                                className="text-blue-500 mr-4"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={() => {
                                    api.deleteInventory(i.id).then(() =>
                                        setItems(items.filter((x) => x.id !== i.id))
                                    );
                                }}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </DashboardLayout>
    );
}
