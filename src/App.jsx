import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import Dashboard from '@/components/pages/Dashboard';
import FoodLog from '@/components/pages/FoodLog';
import Workouts from '@/components/pages/Workouts';
import Progress from '@/components/pages/Progress';
import Settings from '@/components/pages/Settings';
import Onboarding from '@/components/pages/Onboarding';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="food-log" element={<FoodLog />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="mt-16 mr-4"
        />
      </div>
    </Router>
  );
}

export default App;