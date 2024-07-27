import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AdminIn() {
  // State for managing form input and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    // Example login function
    login(email, password);
  };

  // Example login function
  const login = (email, password) => {
    // Replace with actual login logic
    console.log('Logging in with:', { email, password });

    // Clear the error if login succeeds
    setError('');
    navigate('/dashboard');

    // Handle successful login, e.g., redirect or update state
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark">
      <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 sm:p-12.5 xl:p-17.5">
          <div className="mb-6 flex items-center justify-center gap-3">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
              Sign In
            </h2>
          </div>

          <h2 className="mb-9 text-2xl font-bold text-black text-center dark:text-white sm:text-title-xl2">
            Sign In Admin
          </h2>

          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="6+ Characters, 1 Capital letter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="submit"
                value="Sign In"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminIn;