import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import InitLoadingScreen from './pages/init_load/init_load';
import Home from './pages/home/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={InitLoadingScreen}/>
        <Route path='/home' Component={Home}/>
      </Routes>
    </Router>
  );
}

export default App;
