import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import ComplaintPage from './components/ComplaintPage/ComplaintPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import VideoPage from './components/VideoPage/VideoPage';
import IASAtekaMainPage from './components/IASAtekaMainPage/IASAtekaMainPage';
import NewVideoPage from './components/NewVideoPage/NewVideoPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <main className='default'>
          <Routes>
            <Route exact path="/news" element={<MainPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/complaint" element={<ComplaintPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/video/new" element={<NewVideoPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route exact path="/video" element={<IASAtekaMainPage />} />
            <Route exact path="/" element={<MainPage />}/>
          </Routes>
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
