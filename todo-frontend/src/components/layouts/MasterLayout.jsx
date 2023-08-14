import { Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
const MasterLayout = () => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="bg-[#040406] min-h-screen w-full mx-auto">
        <div className="flex flex-row">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
