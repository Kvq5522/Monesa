import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './assets/css/main.min.css'
import './assets/css/dark.min.css'
import './assets/css/light.min.css'
import './assets/css/index.css';


import HomePage from './pages/homepage/home';
import UserPage from './pages/user/index';
import AdminPage from './pages/admin/index';
import Forgot from './pages/forgot-change/forgot';
import Password from './pages/forgot-change/changepassword';


// import Forgot from './forgot';
// import Password from './changepassword';

import ThemeContextWrapper from './components/themeWrapper/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/forgot/' element={<Forgot />} />
          <Route path='/reset/:mail' element={<Password />} />
          <Route path='/user/*' element={<UserPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeContextWrapper>
); 