import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
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
import { clearAdminToken, getAdminToken } from './utils/adminAuth';

const AdminRoute = ({ children }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      const token = getAdminToken();

      if (!SERVER_URL || !token) {
        clearAdminToken();
        if (isMounted) {
          setIsAuthorized(false);
          setIsChecking(false);
        }
        return;
      }

      try {
        await axios.get(`${SERVER_URL}/admin/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (isMounted) {
          setIsAuthorized(true);
        }
      } catch (err) {
        clearAdminToken();
        if (isMounted) {
          setIsAuthorized(false);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, [SERVER_URL]);

  if (isChecking) return null;

  if (!isAuthorized) {
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
