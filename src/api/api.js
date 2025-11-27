// src/api.js
const API_BASE =
    import.meta.env.VITE_API_BASE || "https://workshop-api-jurh.onrender.com/api";

/** Generic fetch wrapper */
async function request(path, { method = "GET", body, raw = false } = {}) {
    const token =
        localStorage.getItem("authtoken") || localStorage.getItem("token");

    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = "Bearer " + token;

    const res = await fetch(API_BASE + path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        throw data || { error: "Network Error" };
    }

    return raw ? res : data;
}

export default {
    // AUTH ----------------------------------------------------
    login: (body) => request("/auth/login", { method: "POST", body }),
    register: (body) => request("/auth/register", { method: "POST", body }),

    // INVENTORY -----------------------------------------------
    getInventory: () => request("/inventory"),
    createInventory: (body) =>
        request("/inventory/create", { method: "POST", body }),
    updateInventory: (id, body) =>
        request(`/inventory/${id}`, { method: "PUT", body }),
    deleteInventory: (id) =>
        request(`/inventory/${id}`, { method: "DELETE" }),

    // VEHICLES ------------------------------------------------
    getVehicles: () => request("/vehicles"),
    createVehicle: (body) =>
        request("/vehicles/create", { method: "POST", body }),
    updateVehicle: (id, body) =>
        request(`/vehicles/${id}`, { method: "PUT", body }),
    deleteVehicle: (id) =>
        request(`/vehicles/${id}`, { method: "DELETE" }),

    // CUSTOMERS -----------------------------------------------
    getCustomers: () => request("/customers"),
    createCustomer: (body) =>
        request("/customers", { method: "POST", body }),
    updateCustomer: (id, body) =>
        request(`/customers/${id}`, { method: "PUT", body }),
    deleteCustomer: (id) =>
        request(`/customers/${id}`, { method: "DELETE" }),

    // JOBS / WORK ORDERS --------------------------------------
    getJobs: () => request("/jobs"),
    createJob: (body) =>
        request("/jobs/create", { method: "POST", body }),
    updateJob: (id, body) =>
        request(`/jobs/${id}`, { method: "PUT", body }),
    deleteJob: (id) =>
        request(`/jobs/${id}`, { method: "DELETE" }),

    // INVOICES -----------------------------------------------
    getInvoices: () => request("/invoices"),
    createInvoice: (body) =>
        request("/invoices", { method: "POST", body }),
    payInvoice: (id) =>
        request(`/invoices/${id}/pay`, { method: "POST" }),

    // ANALYTICS ----------------------------------------------
    getDailyStats: () => request("/invoices/stats/daily"),
    getMonthlyStats: () => request("/invoices/stats/monthly"),
    getStats: () => request("/invoices/stats/status"),
    getCustomerAnalytics: () => request('/customers/analytics/overview'),
    getCustomerStats: () => request('/customers/stats/overview'),

    getUsers : () => request("/users"),
    createUser: (body) => request("/users/create", {method: "POST", body}),
    updateUser : (id, data) => request(`/users/${id}`, {method: 'PUT', data}),
    deleteUser : (id) => request(`/users/${id}`)
};
