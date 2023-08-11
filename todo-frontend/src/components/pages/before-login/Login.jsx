import { Link, useNavigate } from 'react-router-dom';
import LoginTodo from '../../../assets/images/todo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';

const Login = () => {
  // const [loginDetails, setLoginDetails] = useState({ data: null, error: null });
  let loginError = useRef(null);
  let navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = (data) => {
    loginError.current = null;
    // let url = import.meta.env.VITE_API_BASE_URL + 'user/login';
    // return axios
    //   .post(url, data)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     let err = error.message
    //       ? error.message
    //       : 'Something went wrong. Please try again';
    //     loginError.current = err;
    //   });
    // navigation('/todos');
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-16 h-16 mr-2" src={LoginTodo} alt="logo" />
            Todo App
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {loginError && loginError.current ? (
                <div className="my-2 p-2 w-full bg-red-500 text-white rounded-md text-center">
                  {loginError.current}
                </div>
              ) : null}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onLoginSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    autoComplete="off"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors?.email && errors?.email?.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  {errors?.password && errors?.password?.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 cursor-pointer"
                  value="Sign In"
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?&nbsp;&nbsp;
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
