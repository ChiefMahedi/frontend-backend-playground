import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <div className="w-full tablet:w-64 fixed tablet:static bg-sidebar z-40">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto ml-0 tablet:ml-0 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
