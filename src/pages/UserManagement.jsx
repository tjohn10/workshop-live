import React, { useEffect, useState } from "react";
import api from '../api/api.js'
import DashboardLayout from "../layouts/DashboardLayout.jsx";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        role: "mechanic",
        password: "",
    });

    const fetchUsers = async () => {
        const res = await api.getUsers();
       if (res.status === true){
           setUsers(res.data);
           console.log(users, "users")
       } else {
           setUsers(null)
       }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openCreate = () => {
        setForm({ firstname: "", lastname: "", email: "", role: "mechanic", password: "" });
        setShowCreate(true);
    };

    const openEdit = (u) => {
        setSelectedUser(u);
        setForm({
            firstname: u.firstname,
            lastname: u.lastname,
            email: u.email,
            role: u.role,
            password: "",
        });
        setShowEdit(true);
    };

    const openDelete = (u) => {
        setSelectedUser(u);
        setShowDelete(true);
    };

    const handleCreate = async () => {
        await api.createUser(form);
        setShowCreate(false);
        await fetchUsers();
    };

    const handleEdit = async () => {
        await api.updateUser(selectedUser.id, form);
        setShowEdit(false);
        await fetchUsers();
    };

    const handleDelete = async () => {
        await api.deleteUser(selectedUser.id);
        setShowDelete(false);
        await fetchUsers();
    };

    const filtered = users.filter((u) =>
        u.firstname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">User Management</h2>
                <button
                    onClick={openCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    + Add User
                </button>
            </div>

            {/* Search */}
            <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 border rounded-md mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* USERS TABLE */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Firstname</th>
                        <th className="p-3 text-left">Surname</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                    </thead>
                    {
                        (
                            <tbody>
                            {filtered.map((u) => (
                                <tr className="border-b" key={u.id}>
                                    <td className="p-3">{u.firstname}</td>
                                    <td className="p-3">{u.firstname}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3 capitalize">{u.role}</td>
                                    <td className="p-3 flex gap-2">
                                        <button
                                            onClick={() => openEdit(u)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openDelete(u)}
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center p-5 text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        )
                    }

                </table>
            </div>

            {/* CREATE USER MODAL */}
            {showCreate && (
                <Modal title="Create User" close={() => setShowCreate(false)}>
                    <UserForm form={form} setForm={setForm} />

                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 w-full text-white py-2 rounded mt-4"
                    >
                        Save
                    </button>
                </Modal>
            )}

            {/* EDIT USER MODAL */}
            {showEdit && (
                <Modal title="Edit User" close={() => setShowEdit(false)}>
                    <UserForm form={form} setForm={setForm} isEdit />

                    <button
                        onClick={handleEdit}
                        className="bg-yellow-600 w-full text-white py-2 rounded mt-4"
                    >
                        Update
                    </button>
                </Modal>
            )}

            {/* DELETE CONFIRMATION */}
            {showDelete && (
                <Modal title="Delete User" close={() => setShowDelete(false)}>
                    <p className="text-center">
                        Are you sure you want to delete <b>{selectedUser?.name}</b>?
                    </p>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 w-full text-white py-2 rounded mt-4"
                    >
                        Yes, Delete
                    </button>
                </Modal>
            )}
        </DashboardLayout>
    );
}

function UserForm({ form, setForm, isEdit }) {
    return (
        <div className="space-y-3">
            <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                className="w-full p-2 border rounded"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                type="email"
                placeholder="Email"
                value={form.email}
                className="w-full p-2 border rounded"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select
                className="w-full p-2 border rounded"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="cashier">Cashier</option>
            </select>

            {!isEdit && (
                <input
                    type="password"
                    placeholder="Default Password"
                    value={form.password}
                    className="w-full p-2 border rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
            )}
        </div>
    );
}

function Modal({ title, children, close }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={close}>✖</button>
                </div>

                {children}
            </div>
        </div>
    );
}
