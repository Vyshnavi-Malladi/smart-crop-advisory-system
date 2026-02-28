import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Feature Pages
import Dashboard from './pages/Dashboard';
import CropRecommend from './pages/CropRecommend';
import YieldPredict from './pages/YieldPredict';
import DiseaseDetect from './pages/DiseaseDetect';
import Store from './pages/Store';

function App() {
    return (
        <div className="min-h-screen text-gray-800 font-sans bg-surface-light">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Layout><Navigate to="/dashboard" /></Layout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
                <Route path="/crop-recommend" element={<ProtectedRoute><Layout><CropRecommend /></Layout></ProtectedRoute>} />
                <Route path="/yield-predict" element={<ProtectedRoute><Layout><YieldPredict /></Layout></ProtectedRoute>} />
                <Route path="/disease-detect" element={<ProtectedRoute><Layout><DiseaseDetect /></Layout></ProtectedRoute>} />
                <Route path="/store" element={<ProtectedRoute><Layout><Store /></Layout></ProtectedRoute>} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </div>
    );
}

export default App;
