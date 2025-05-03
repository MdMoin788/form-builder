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

  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<LoginBeforeMessage title="content"  />} />
        <Route path="/f/:slug/:formId" element={<PublishedForm />} />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-100 text-gray-800">
              <nav className="bg-white py-2 px-1 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold">📋</h1>
                <div className="space-x-4">
                  <Link to="/">Dashboard</Link>
                  <Link to="/create">Create Form</Link>
                </div>
              </nav>
              <main className="p-4 max-w-5xl mx-auto flex flex-col justify-center sm:w-100">
                <Dashboard />
              </main>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/responses/:slug/:formId" element={
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
