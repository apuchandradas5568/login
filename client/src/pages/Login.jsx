import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axios = useAxios()

  const user = JSON.parse(localStorage.getItem('user')) || null;
  const navigate = useNavigate()


//  useEffect(()=>{
//   if(user) {
//     navigate('/')
//   }
//  })

  const [successMessage, setSuccessMessage] = useState(null);

  

  const onSubmit = data => {

    axios.post('users/login', data)
    .then((res)=>{
      console.log(res.data.data.user);
      console.log(res.data.data.accessToken);
      console.log(res.data.data.refreshToken);
      setSuccessMessage(res.data.message);
      localStorage.setItem('accessToken', res.data.data.accessToken);
      localStorage.setItem('refreshToken', res.data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));

    })
  };

  return (
    <div className=" min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-gray-700">Username or Email</label>
            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              {...register('usernameOrEmail', { required: 'Username or Email is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.usernameOrEmail && <span className="text-red-600 text-sm">{errors.usernameOrEmail.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            {successMessage && <span className="text-green-600 text-sm">{successMessage}</span>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
