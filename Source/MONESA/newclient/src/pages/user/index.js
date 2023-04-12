import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import MySideBar from '../../layouts/sidebar'
import MyNavBar from '../../layouts/navbar'
import MyFooter from '../../layouts/footer'

import MyAccount from './account'
import MyDashboard from './dashboard'
import MyFriend from './friend'
import MySetting from './setting'
import MyWorkspace from './workspace'

export default function UserPage() {
  useEffect(() => {
    document.body.classList.add('font-opensans')
  })


  return (
    <>
      <div id='main_content'>
        <MySideBar />
        <div className='page'>
          <div id='page_top' className='section-body sticky-top'>
            <div className='container-fluid'>
              <MyNavBar />
              <Routes>
                <Route path='/:id' element={<MyDashboard />} />
                <Route path='/account/*' element={<MyAccount />} />
                <Route path='/friend/*' element={<MyFriend />} />
                <Route path='/setting/*' element={<MySetting />} />
                <Route path='/workspace/:id' element={<MyWorkspace />} />
                {/* <Route path='/*' element={ <Navigate replace to="/user/" /> }/> */}
              </Routes>
            </div>
          </div>
          <MyFooter />
        </div>
      </div>
    </>
  )
}