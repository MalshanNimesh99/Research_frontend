import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.js'
import SignUp from './components/signup.js'
import CognHome from './pages/CognHome';
import History from './pages/History';
import Settings from './pages/Settings';
import Image from './pages/Image';
import Navigate_CKD from './pages/Navigate_CKD';
import BrainTumor from './pages/BrainTumor'
import Demented from './pages/Demented'
import MainHome from './pages/MainHome'
import Pneumonia from './pages/Pneumonia'


function App() {
  return (
    <Router>
      <div className="App">
       
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/mainhome" index element={<MainHome/>} />
              <Route path="/cognhome" index element={<CognHome/>} />
              <Route path="/history/:id" element={<History/>} />              
              <Route path="/settings/:id" element={<Settings/>} />
              <Route path="/image/:id" element={<Image/>} />
              <Route path="/n_ckd" element={<Navigate_CKD/>} />
              <Route path="/braintumor" element={<BrainTumor/>} />
              <Route path="/demented" element={<Demented/>} />
              <Route path="/pneumonia" element={<Pneumonia/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App