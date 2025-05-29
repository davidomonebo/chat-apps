import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.jsx';
import bgImage from './assets/bgImage.svg'; // if using local import

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div
      className="bg-cover min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
