import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Member from './page/Member';
import Study from './page/Study';
import Recruit from './page/Recruit';
import StudyDetail from './page/StudyDetail';
import StudyCategory from './page/StudyCategory';
import Admin from './page/Admin';
import AdminBoard from './page/AdminBoard';
import AdminCate from './page/AdminCate';
import AdminWeek from './page/AdminWeek';
import AdminUsers from './page/AdminUsers';
import AdminMember from './page/AdminMember';

const isValidAdminToken = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;

    const normalizedBase64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(normalizedBase64));
    const nowInSeconds = Math.floor(Date.now() / 1000);

    return payload.isAdmin === true && payload.exp > nowInSeconds;
  } catch (err) {
    return false;
  }
};

const AdminRoute = ({ children }) => {
  if (!isValidAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Member />} />
        <Route path="/study" element={<Study />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/study/:semesterId" element={<StudyDetail />} />
        <Route path="/study/:semesterId/:category" element={<StudyCategory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/board" element={<AdminRoute><AdminBoard /></AdminRoute>} />
        <Route path="/admin/board/:semesterId" element={<AdminRoute><AdminCate /></AdminRoute>} />
        <Route path="/admin/board/:semesterId/:category" element={<AdminRoute><AdminWeek /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/member" element={<AdminRoute><AdminMember /></AdminRoute>} />
      </Routes>
    </Router>
  )
}

export default App;
