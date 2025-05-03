import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './screens/Dashboard';
import { useState } from 'react';
import LoginBeforeMessage from './components/forms/LoginBeforeMessage';
import ProtectedRoute from './ProtectedRoute';
import CreateForm from './components/formBuilder/CreateForm';
import PublishedForm from './components/formBuilder/PublishedForm';
import FormResponses from './components/formBuilder/FormResponses';

function App() {
  const [setIsLoggedIn] = useState(false);

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<LoginBeforeMessage title="content" setIsLoggedIn={setIsLoggedIn} />} />
        {/* Public route (anyone can open) */}
        <Route path="/f/:slug" element={<PublishedForm />} />
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 text-gray-800">
              <nav className="bg-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold">📋 Formulate</h1>
                <div className="space-x-4">
                  <Link to="/">Dashboard</Link>
                  <Link to="/create">Create Form</Link>
                </div>
              </nav>
              <main className="p-4 max-w-5xl mx-auto">
                <Dashboard />
              </main>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/responses/:slug" element={
          <ProtectedRoute>
            <FormResponses />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute>
            <CreateForm />
          </ProtectedRoute>
        } />


      </Routes>
    </div>
  );
}

export default App;
