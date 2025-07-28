import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './page/Home';
import Member from './page/Member';
import Study from './page/Study';
import Recruit from './page/Recruit';


function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Member />} />
        <Route path="/study" element={<Study />} />
        <Route path="/recruit" element={<Recruit />} />
      </Routes>
    </Router>
  )
}

export default App;