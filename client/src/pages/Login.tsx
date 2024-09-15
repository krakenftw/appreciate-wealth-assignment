import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dummyEmail = "user@example.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800 flex flex-col items-center justify-center'>
        <h2 className='text-4xl font-bold text-center text-gray-900 dark:text-white'>
          {isLogin ? "Login" : "Register"}
        </h2>
        <h3 className='text-2xl text-center'>
          By signing in you are agreeing
          <br /> our
          <span className='text-blue-600'>
            Term and privacy policy
          </span>
        </h3>
        <div className='flex my-4 justify-center space-x-4'>
          <button
            type='button'
            className={`text-lg font-medium ${isLogin ? 'text-blue-600 underline' : 'text-gray-400'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type='button'
            className={`text-lg font-medium ${!isLogin ? 'text-blue-600 underline' : 'text-gray-400'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        <form className='mt-8 w-full flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <Input
                id='email-address'
                name='email'
                type='email'
                required
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                className='relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
              />
              <label
                htmlFor='remember-me'
                className='block ml-2 text-sm text-gray-900 dark:text-white'
              >
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <a
                href='#'
                className='font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type='submit'
              className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>

          <div className='flex items-center justify-center mt-6'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              Or connect with
            </span>
          </div>

          <div className='flex justify-center mt-2 space-x-4'>
            <img
              src='https://img.icons8.com/?size=100&id=17950&format=png&color=000000'
              alt='Google'
              className='w-10 h-10'
            />
            <img
              src='https://img.icons8.com/?size=100&id=118467&format=png&color=000000'
              alt='Facebook'
              className='w-10 h-10'
            />
            <img
              src='https://img.icons8.com/?size=100&id=8824&format=png&color=000000'
              alt='Twitter'
              className='w-10 h-10'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
