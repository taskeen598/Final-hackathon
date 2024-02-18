// import Login from "./auth/login"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthStore from '../../zustand/auth.zustand';
const Signup = () => {
  const router = useRouter();
  const { isLoggedin, login, signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  useEffect(() => {
    let isLoggedin = localStorage.getItem('Auth');
    isLoggedin = JSON.parse(isLoggedin);
    isLoggedin = isLoggedin?.state?.isLoggedin;
    if (isLoggedin) {
      router.push('/ui/dashboard');
    } else {
      router.push('/auth/signup');
    }
  }, []);
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async () => {
    let valid = true;
    const errorsCopy = { ...errors };

    // Name validation
    if (!loginData.name.trim()) {
      errorsCopy.name = 'Name is required';
      valid = false;
    } else {
      errorsCopy.name = '';
    }

    // Email validation
    if (!loginData.email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(loginData.email)) {
      errorsCopy.email = 'Invalid email address';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    // Password validation
    if (!loginData.password.trim()) {
      errorsCopy.password = 'Password is required';
      valid = false;
    } else {
      errorsCopy.password = '';
    }
    setErrors(errorsCopy);
    if (valid) {
      try {
        await Promise.all([signup(loginData)]);
        if (isLoggedin) {
          router.push('/ui/dashboard');
        } else {
          router.push('/auth/signup');
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  // Regular expression for email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-2xl py-2 rounded font-bold bg-blue-500 text-center text-white">
          Create Account
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-semibold text-blue-800">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className={`block w-full px-4 py-2 mt-2 text-blue-800 bg-white border rounded-md focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.email && 'border-red-500'}`}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-blue-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`block w-full px-4 py-2 mt-2 text-blue-800 bg-white border rounded-md focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.email && 'border-red-500'}`}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-blue-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : "password"}
                id="password"
                name="password"
                className={`block w-full px-4 py-2 mt-2 text-blue-800 bg-white border rounded-md focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password && 'border-red-500'}`}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-blue-800"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div className="mt-6" onClick={handleSubmit}>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-purple-600">
              Sign up
            </button>
          </div>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <Link
            href="/"

          >
            <span className="font-medium text-red-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;