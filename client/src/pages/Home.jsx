import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' flex items-center justify-center min-h-[80vh] p-2' >
        <div className='flex flex-col justify-center items-center' >
            <h1 className='text-4xl font-bold text-center'>Welcome to MyApp</h1>
            <p className='text-center mb-8 text-lg'>The best place to learn and grow</p>

<hr className='w-full border-gray-400  mb-4' />
            <Link to={'/payment'} className='border p-2 m-2 rounded-md shadow-md hover:bg-gray-200  '>Go For Payment</Link>
            <Link to={'/user-profile'} className='border p-2 m-2 rounded-md shadow-md hover:bg-gray-200  '>Go For User</Link>

        </div>
    </div>
  )
}

export default Home