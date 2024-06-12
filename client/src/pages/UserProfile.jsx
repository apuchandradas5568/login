import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const user = JSON.parse(localStorage.getItem('user')) || null;

  const openModal = () => {
    setIsModalOpen(true);
    reset(user);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    closeModal();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <button onClick={openModal} className="text-blue-500 hover:text-blue-700">
            <FaEdit size={20} />
          </button>
        </div>
        <div className="mt-6 text-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold mt-4">{user.username}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  {...register('username', { required: 'Username is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.username && <span className="text-red-600 text-sm">{errors.username.message}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-gray-700">Profile Image</label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  {...register('profileImage')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
