import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Admin from './pages/Admin';
import Login from './pages/Login';
import styles from './style';
import Addstudent from './pages/Addstudent';
import Addteacher from './pages/Addteacher';
import Studentupdate from './pages/Studentupdate';
import Teacherupdate from './pages/Teacherupdate';
import Updatedetails from './pages/Updatedetails';
import Updatedetailstea from './pages/Updatedetailstea';


function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <Router>
        <div className={`bg-primary ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/teacher/:id" element={<Teachers />} />
              <Route path="/student/:id" element={<Students />} />
              <Route path="/admin/:id" element={<Admin />} />
              <Route path="/addstudent" element={<Addstudent />} />
              <Route path="/addteacher" element={<Addteacher />} />
              <Route path="/studentupdate" element={<Studentupdate />} />
              <Route path="/teacherupdate" element={<Teacherupdate />} />
              <Route path="/updatedetails/:id" element={<Updatedetails />} />
              <Route path="/updatedetailstea/:id" element={<Updatedetailstea />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
