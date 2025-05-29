import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.jsx';

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[url('/bgImage.svg')] bg-contain">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
