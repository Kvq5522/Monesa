export default function MySideBar() {
  return (
    <>
      <div id="left-sidebar" className="sidebar ">
        <h5 className="brand-name">Monesa</h5>
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul className="metismenu">
            <li className="g_heading">Main</li>
            <li><a href="/user/"><i className="icon-home"></i><span>Dashboard</span></a></li>
            <li className="g_heading">Info</li>
            <li><a href="/user/account"><i className="icon-user"></i><span>Account</span></a></li>
            <li><a href="/user/friend"><i className="icon-people"></i><span>Friend</span></a></li>
            <li><a href="/user/setting"><i className="icon-settings"></i><span>Setting</span></a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}