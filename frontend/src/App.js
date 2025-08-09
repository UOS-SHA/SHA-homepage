import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Member from './page/Member';
import Study from './page/Study';
import Recruit from './page/Recruit';
import StudyDetail from './page/StudyDetail';
import StudyCategory from './page/StudyCategory';
import Admin from './page/Admin';
import AdminBoard from './page/AdminBoard';


function App(){
  return (
    <Router basename="/SHA-homepage">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Member />} />
        <Route path="/study" element={<Study />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/study/:semesterId" element={<StudyDetail />} />
        <Route path="/study/:semesterId/:category" element={<StudyCategory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/board" element={<AdminBoard />} />
      </Routes>
    </Router>
  )
}

export default App;