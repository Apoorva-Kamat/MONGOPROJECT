import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Quiz from './components/Quiz';
import LanguageSelection from './components/LanguageSelection';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz" element={<LanguageSelection />} />
      <Route path="/take-quiz/:language" element={<Quiz />} />
      <Route path="/admin" element={
        <PrivateRoute>
          <AdminPanel />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
