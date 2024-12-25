import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/service';
import Loader from '../../utils/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(formData);
      console.log('Login Successful:', res?.userDetails?.userName);

      // Store the token in cookies
      console.log(res.token);
      if (res?.token) {
        Cookies.set('userName', res?.userDetails?.userName);
        Cookies.set('auth_token', res.token, { expires: 7 }); // Token will expire in 7 days
        navigate('/dashboard');
      }

      console.log(res?.token);
    } catch (error) {
      console.error('Login Failed:', error); // Log the error
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.971 0-9-5.373-9-7s4.029-7 9-7c4.971 0 9 5.373 9 7 0 1.273-1.2 3.456-2.625 4.875M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18m-3-3a9.773 9.773 0 01-1.725.975m-6.862.62C6.627 16.627 3 12.5 3 12.5S6.627 8.373 9.45 7.4m1.294-.13C10.612 7.262 12 8 12 8s2.388-.738 3.256-.865M9.45 7.4a10.05 10.05 0 011.725-.975m3.55 6.675A3 3 0 1112 8.5c1.071 0 2.09.536 2.625 1.5"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? <Loader /> : 'Login'}
          </button>
          <div className="text-center mt-4">
            <small className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
