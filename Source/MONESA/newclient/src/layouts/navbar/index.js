import React, { useState } from 'react'

export default function MyNavBar() {
  const [sidebar, setSidebar] = useState(localStorage.getItem('sidebar') ? localStorage.getItem('sidebar') : true)

  const toggleSidebar = () => {
    setSidebar(!sidebar)
    localStorage.setItem('sidebar', !sidebar)
    document.body.classList.toggle('offcanvas-active')
  }

  const toggleDropdown = (e) => {
    // Cần tối ưu

    let myDropStatus, myDropMenuStatus
    let isTarget = e.target.classList.contains('nav-link')
    if (isTarget) {
      myDropStatus = e.target.parentElement.classList.contains('show')
      myDropMenuStatus = e.target.nextSibling.classList.contains('show')
    }
    else {
      myDropStatus = e.currentTarget.parentElement.classList.contains('show')
      myDropMenuStatus = e.currentTarget.nextSibling.classList.contains('show')
    }

    document.querySelectorAll('.dropdown.d-flex').forEach((myDropdown) => {
      myDropdown.classList.remove('show')
    })
    document.querySelectorAll('.dropdown-menu').forEach((myDropdown) => {
      myDropdown.classList.remove('show')
    })

    if (myDropStatus == false)
      if (isTarget)
        e.target.parentElement.classList.toggle('show')
      else 
        e.currentTarget.parentElement.classList.toggle('show')

    if (myDropMenuStatus == false)
      if (isTarget)
        e.target.nextSibling.classList.toggle('show')
      else 
        e.currentTarget.nextSibling.classList.toggle('show')
  }

  return (
    <>
      <div className='page-header'>
        <div className='left'>
          <div className='input-group xs-hide'>
            <a href={void(0)} onClick={toggleSidebar}>
              <i className='icon-grid' data-toggle='tooltip' data-placement='left' title='Sidebar toggle'></i>
            </a>
          </div>
        </div>
        <div className='right'>
          <div className='notification d-flex'>
            <div className='dropdown d-flex'>
              <a className='nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1' data-toggle='dropdown' onClick={toggleDropdown}><i className='fa fa-bell'></i><span className='badge badge-primary nav-unread'></span></a>
              <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                <ul className='list-unstyled feeds_widget'>
                  <li>
                    <div className='feeds-left'><i className='fa fa-check'></i></div>
                    <div className='feeds-body'>
                      <h4 className='title'>Demo <small className='float-right text-muted'>Today</small></h4>
                    </div>
                  </li>
                  <li>
                    <div className='feeds-left'><i className='fa fa-check'></i></div>
                    <div className='feeds-body'>
                      <h4 className='title'>Demo <small className='float-right text-muted'>Today</small></h4>
                    </div>
                  </li>
                  <li>
                    <div className='feeds-left'><i className='fa fa-check'></i></div>
                    <div className='feeds-body'>
                      <h4 className='title'>Demo <small className='float-right text-muted'>Today</small></h4>
                    </div>
                  </li>
                  <li>
                    <div className='feeds-left'><i className='fa fa-check'></i></div>
                    <div className='feeds-body'>
                      <h4 className='title'>Demo <small className='float-right text-muted'>Today</small></h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='dropdown d-flex'>
              <a className='nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1' data-toggle='dropdown' onClick={toggleDropdown}><i className='fa fa-user'></i></a>
              <div className='dropdown-menu dropdown-menu-right dropdown-menu-arrow'>
                <a className='dropdown-item' href='/user/account'><i className='dropdown-icon fe fe-user'></i> Profile</a>
                <a className='dropdown-item' href='/user/setting'><i className='dropdown-icon fe fe-settings'></i> Settings</a>
                <div className='dropdown-divider'></div>
                <a className='dropdown-item' href='/logout'><i className='dropdown-icon fe fe-log-out'></i> Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}