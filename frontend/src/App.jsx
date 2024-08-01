import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary'
import PrivateRoute from './components/PrivateRoute'
import CenteredSpinner from './components/CenteredSpinner';
import { ToastContainer } from 'react-toastify';
import { ContactForm } from './features/ContactForm';
import NotFound from './components/NotFound';

// Lazy load components
const AdminLogin = lazy(() => import('./features/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./features/Admin/AdminDashboard'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer position="top-center" />
        <Suspense fallback={<CenteredSpinner />}>
          <Routes>
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<PrivateRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
             <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
