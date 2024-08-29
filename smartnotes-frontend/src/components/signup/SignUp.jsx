import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/login'); 
  };

  return (
    <div className='w-96 mb-10'>
      <div className='w-full mx-4 bg-white shadow-lg rounded-lg overflow-hidden'>
        <p className='text-center py-4 bg-[#41b3a2] text-2xl text-white font-semibold'>Sign Up</p>
        <form className='p-6' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="username" className='block text-lg font-bold text-gray-700 mb-2'>Name:</label>
            <input
              type="text"
              id="username"
              className='w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent'
              placeholder="Enter your name"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-lg font-bold text-gray-700 mb-2'>Email:</label>
            <input
              type="email"
              id="email"
              className='w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent'
              placeholder="Enter your email"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-lg font-bold text-gray-700 mb-2'>Password:</label>
            <input
              type="password"
              id="password"
              className='w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent'
              placeholder="Enter your password"
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="notespassword" className='block text-lg font-bold text-gray-700 mb-2'>Set Password For Notes:</label>
            <input
              type="password"
              id="notespassword"
              className='w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41b3a2] focus:border-transparent'
              placeholder="Set a password for your notes"
            />
          </div>
          <div className='text-center'>
            <button
              type="submit"
              className='px-6 py-3 bg-[#41b3a2] text-white font-semibold rounded-md shadow-md hover:bg-[#33a89f] transition duration-300'
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
