// src/App.jsx (snippet)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import InventoryPage from './pages/InventoryPage'
import Vehicles from './pages/Vehicles'
import Customers from './pages/Customers'
import Jobs from './pages/Jobs'
import JobCreate from './pages/JobCreate'
import Payments from './pages/Payments'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/inventory" element={<ProtectedRoute><InventoryPage/></ProtectedRoute>} />
                <Route path="/vehicles" element={<ProtectedRoute><Vehicles/></ProtectedRoute>} />
                <Route path="/customers" element={<ProtectedRoute><Customers/></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs/></ProtectedRoute>} />
                <Route path="/jobs/create" element={<ProtectedRoute><JobCreate/></ProtectedRoute>} />
                <Route path="/payments" element={<ProtectedRoute><Payments/></ProtectedRoute>} />
            </Routes>
        </Router>
    )
}
