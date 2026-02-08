import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/admin/board" element={<AdminBoard />} />
        <Route path="/admin/board/:semesterId" element={<AdminCate />} />
        <Route path="/admin/board/:semesterId/:category" element={<AdminWeek />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/member" element={<AdminMember />} />
      </Routes>
    </Router>
  )
}

export default App;