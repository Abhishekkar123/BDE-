import  { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function AdminIn() {
  // State for managing form input and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
    //check the token s present
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Redirect to dashboard if token exists
        navigate('/dashboard'); 
      }
    }, [navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError('Please fill the fields.');
      return;
    }

    // Example login function
    login(email, password);
  };

  // Example login function
  const login =async (email, password) => {
    // Replace with actual login logic
    // console.log('Logging in with:', { email, password });

    // // Clear the error if login succeeds
    // setError('');
    // navigate('/dashboard');

    // Handle successful login, e.g., redirect or update state

    try{
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      setError('');
      navigate('/dashboard');
      
       console.log("abc",(response.data.existUser))
       const permission=response.data.existUser.permissions;
       console.log(JSON.stringify(permission))
       console.log(permission[0].lead.view)
      //store in localstorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user',response.data.existUser.roleName);
      localStorage.setItem("permission",JSON.stringify(permission))
      localStorage.setItem("id",response.data.existUser.id);
      localStorage.setItem("role",response.data.existUser.roleName);
      // localStorage.setItem('prespermission',)
      
    }catch(error){
      if (error.response && error.response.status === 401) {
        // 401 status code typically means unauthorized, such as wrong password
        setError('Incorrect email or password. Please try again.');
      } else {
        // Handle other possible errors (e.g., network issues)
        setError('Incorrect email or password. Please try again.');
      }

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark">
      <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-4 sm:p-12.5 xl:p-17.5">
          

          <h2 className="mb-9 text-2xl font-bold text-black text-center dark:text-white sm:text-title-xl2">
            Sign In 
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
               Password
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
                className="w-full cursor-pointer rounded-lg border border-primary  p-4 text-white transition hover:bg-opacity-90"
                 style={{backgroundColor:'#152238'}}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminIn;
