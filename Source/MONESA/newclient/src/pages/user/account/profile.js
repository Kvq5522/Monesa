import React, { useState, useEffect } from 'react'

export default function MyAccountProfile() {
  const [data, setData]  = useState({
    name: '',
    username: '', 
    email: '',
    phone: '',
  })


  const submitHandler = (e) => {
    console.log(data)
    console.log('Submit form')
  }

  const profileHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className='card'>
        <div className='card-header text-center'>
          <h3 className='card-title'>Edit Profile</h3>
        </div>
        <div className='card-body'>
          <div className='row clearfix'>
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Name</label>
                    <input name='name' type='text' className='form-control' placeholder='Enter your name' value={data.name} onChange={profileHandler}/>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Username</label>
                    <input name='username' type='text' className='form-control' placeholder='Enter your username' value={data.username} onChange={profileHandler}/>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Email</label>
                    <input name='email' type='text' className='form-control' disabled placeholder='Enter your mail' value={data.email} onChange={profileHandler}/>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-label'>Phone</label>
                    <input name='phone' type='text' className='form-control' placeholder='Enter your phone' value={data.phone} onChange={profileHandler}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer text-center'>
          <button type='submit' className='btn btn-primary' onClick={submitHandler}>Update Profile</button>
        </div>
      </div>
    </>
  )
}