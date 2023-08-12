import { Outlet } from 'react-router-dom';
// import LoaderLayout from './LoaderLayout';

const AuthLayout = () => {
  return (
    <>
      <div className="container-fluid mx-auto">
        {/* <LoaderLayout /> */}
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
