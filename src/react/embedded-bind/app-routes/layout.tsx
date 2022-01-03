import { Outlet } from 'react-router';

function Layout() {
  return (
    <div style={{ backgroundColor: 'darkblue' }}>
      <h1 style={{ color: 'white' }}>App</h1>
      <Outlet />
    </div>
  )
}

export default Layout;