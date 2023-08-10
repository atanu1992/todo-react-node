import { Outlet } from 'react-router-dom';
const MasterLayout = () => {
  return (
    <>
      <div className="container-fluid mx-auto">
        <div className="flex flex-row">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
