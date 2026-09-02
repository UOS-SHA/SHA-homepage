import React from 'react';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Member from './page/Member';
import Faq from './page/Faq';
import Study from './page/Study';
import StudyCategory from './page/StudyCategory';
import StudyDetail from './page/StudyDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Member />} />
        <Route path="/study" element={<Study />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/recruit" element={<Navigate to="/faq" replace />} />
        <Route path="/study/:semesterId" element={<StudyDetail />} />
        <Route path="/study/:semesterId/:category" element={<StudyCategory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
