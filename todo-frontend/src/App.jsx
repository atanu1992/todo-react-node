import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import AuthLayout from './components/layouts/AuthLayout';
import Login from './components/pages/before-login/Login';
import Register from './components/pages/before-login/Register';
import MasterLayout from './components/layouts/MasterLayout';
import Todos from './components/pages/after-login/Todo/Todos';
const router = createBrowserRouter([
  {
    path: '',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Navigate to="login" />, index: true },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: 'todos',
    element: <MasterLayout />,
    children: [{ path: '', element: <Todos /> }],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
