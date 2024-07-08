// // Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import  './login.css';
// import { useNavigate } from 'react-router-dom'
// import { login } from '../../api/api';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const resp =await login({email, password});
//     if(resp?.status===200){
//       console.log(resp);
//       // const values = data;
//        localStorage.setItem('role',resp?.data?.user?.role)
  
//       if (resp?.data?.user?.role === 'admin') {
//         navigate('/adminDashboard');
//       } else {
//         navigate('/userProfile');
//       }
//     }
   


   
//   };

//   return (
//     <div className='parentForm'>
//       {/* <h2 className='heading'>Login</h2> */}
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <br />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <br />
//         <button type="submit">Login</button>
//         <span>Not Registered yet..? <a href='./register'>Register</a></span>
//       </form>
      
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await login({ email, password });

      if (resp?.status === 200) {
        localStorage.setItem('role', resp?.data?.user?.role);

        if (resp?.data?.user?.role === 'admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/userProfile');
        }
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again later.');
      console.error('Login API error:', error);
    }
  };

  return (
    <div className='parentForm'>
      {/* <h2 className='heading'>Login</h2> */}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
        <span>Not Registered yet..? <a href='./register'>Register</a></span>
      </form>
    </div>
  );
};

export default Login;
