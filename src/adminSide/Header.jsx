import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa';
import ConfirmationModal from '../components/ConfirmationModal';

function header({logout ,handleLogout ,logoutModal, handleCancel , openLogoutModal}) {
  const navigate = useNavigate()
  
  return (
    <div className='w-full flex items-center justify-between fixed h-20 bg-slate-500 top-0'>
         <ConfirmationModal
                isOpen={logoutModal}
                title="Confirmation"
                message="Are you sure you want to logout?"
                onCancel={handleCancel}
                onConfirm={handleLogout}
        />
      <img onClick={()=> navigate('/adminHome')} className='pl-10 cursor-pointer h-11' src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png" alt="" />
      {logout && 
            <button
            onClick={openLogoutModal}
            className="flex items-center justify-center px-4 py-2 mr-5 space-x-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
          ><FaSignOutAlt /><span>Logout</span></button>
      }

    </div>
  )
}

export default header
