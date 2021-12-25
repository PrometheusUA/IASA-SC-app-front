import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import ComplaintPage from './components/ComplaintPage/ComplaintPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className='default'>
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/news" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/complaint" element={<ComplaintPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
