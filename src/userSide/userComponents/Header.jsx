import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header({ home, url }) {
  const navigate = useNavigate()
  const user = useSelector(state => state.users.user)
  return (
    <div className="bg-black flex justify-between text-white py-4 px-6">
      <h1 onClick={()=> navigate('/home')} className="text-xl cursor-pointer font-semibold">CHOOSE.In</h1>
      {home && (
        <div className='flex items-center'>
          <h1 className="mr-2">{user.name}</h1>
          <img onClick={()=> navigate('/profile')} className='rounded-full cursor-pointer h-8 w-8' src={user.imageUrl} alt="User" />
        </div>
      )}
    </div>
  );
}

export default Header;
