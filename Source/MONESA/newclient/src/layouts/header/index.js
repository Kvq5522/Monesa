import Logo from '../../assets/img/logo_1.png'

export default function MyHeader(){
  return (
    <>
      <div id='header_top' className='header_top'>
        <div className='container'>
          <div className='hleft'>
            <a className='header-brand' href='/'><img className='brand-logo' src={Logo} alt='logo'></img></a>
            <div className='dropdown'>
              <a href='/user/' className='nav-link icon xs-hide'><i className='fa fa-home' data-toggle='tooltip' data-placement='right' title='Home'></i></a>
              <a href='/user/workspace' className='nav-link icon xs-hide'><i className='fa fa-hashnode' data-toggle='tooltip' data-placement='right' title='Workspace'></i></a>
            </div>
          </div>
          <div className='hright'>
            <div className='dropdown'>
              <a href='/user/setting' className='nav-link icon settingbar'><i className='fa fa-gear' data-toggle='tooltip' data-placement='right' title='Settings'></i></a>
              <a href='/user/profile' className='nav-link user_btn'><i className='fa fa-user' data-toggle='tooltip' data-placement='right' title='User Menu'></i></a>
              <a href={void(0)} className='nav-link icon menu_toggle'><i className='fa  fa-align-left'></i></a>
            </div>            
          </div>
        </div>
      </div>
    </>
  )
}