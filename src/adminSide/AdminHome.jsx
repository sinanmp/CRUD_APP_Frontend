import React, { useEffect, useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import Header from './Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useDispatch ,useSelector } from 'react-redux';
import { adminLogout, getUser } from '../redux/userSlice';
import { deleteUser } from '../redux/userSlice';
import Cookies from 'js-cookie';
import ConfirmationModal from '../components/ConfirmationModal';
import Base_Url from '../baseUrl';

function AdminHome() {
  const [modalIsOpen , setIsOpen] = useState(false)
  const admin = useSelector(state => state.users.admin)
  const [url , setUrl] = useState('')
  const dispatch = useDispatch()
  const [logoutModal , setLogoutModal] = useState(false)
  const navigate = useNavigate()
  const users = useSelector(state => state.users.users)
  const [loading , setLoading] = useState(false)
  const [deleteId ,setDeleteId] = useState('')
  const adminAuth = Cookies.get('adminAuth')
  console.log(adminAuth, 'this is adminAuth')

  useEffect(()=>{
    setLoading(true)
    if(adminAuth!='true'){
      navigate('/adminLogin')
      return
    }
    const fetchData = async()=>{
      try {
        const box = document.getElementById('box')
        box.classList.add('shake')
        const response =await axios.get(`http://${Base_Url}/getUserData`)
        console.log(response.data)
        dispatch(getUser(response.data))
      } catch (error) {
        toast.error('cannot fetch datas from databas',{
          autoClose:1000,
          position:'top-center'
        })
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  },[])

  
  const handleDelete = async (id) => {
    setLoading(true);
    if (adminAuth !== 'true') {
      navigate('/adminLogin');
      toast.error('not authenticated', {
        autoClose: 1000,
        position: 'top-right'
      });
      return;
    }
    try {
      const result = await axios.delete(`http://localhost:3001/deleteUser?id=${id}`);
      dispatch(deleteUser(id));
      console.log(result);
      if (result.data.success) {
        toast.success("user Deleted Successfully!", {
          autoClose: 1000,
          position: 'top-center'
        });
        const response = await axios.get(`http://${Base_Url}/getUserData`);
        dispatch(getUser(response.data));
      }
    } catch (error) {
      toast.error('something error find', {
        autoClose: 1000,
        position: 'top-center'
      });
      console.log(error);
    } finally {
      setLoading(false);
      setIsOpen(false)
      setDeleteId('')
    }
  };
  

  const handleUpdateUser = (user) => {
    if(adminAuth!='true'){
      navigate('/adminLogin')
      toast.error('not authenticated',{
        autoClose:1000,
        position:'top-right'
      })
    }
    navigate(`/updateUser/${user._id}`);
  };

  const handleLogout = ()=>{
    setLoading(true)
    try {
      dispatch(adminLogout())
      navigate('/adminLogin')
      Cookies.set('adminAuth', 'false')
      toast.warn('admin inactived!',{
        autoClose:1000,
        position:'top-right'
      })
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
      setLogoutModal(false)
    }
  }

  const handleCancel =()=>{
    setIsOpen(false)
    setLogoutModal(false)
  }
  
  const openLogoutModal = ()=>{
         setLogoutModal(true)
  }

  const openModal = (id ,e)=>{
        setIsOpen(true)
        setDeleteId(id)
  }

  const imageView = (url, e) => {
    // Check if the clicked element is a table row
    if (e.target.parentNode.tagName.toLowerCase() === 'td') {
      // Display the image
      setUrl(url);
    } else {
      console.log(e.target.parentNode)
      console.log('worked coming else')
      setUrl(false);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };



  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
       {loading && <LoadingSpinner  />} 
       <ConfirmationModal
        isOpen={modalIsOpen}
        title="Confirmation"
        message="Are you sure you want to delete this item?"
        onCancel={handleCancel}
        onConfirm={() => handleDelete(deleteId)} 
        id={deleteId}
/>

{url &&
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setUrl(false)}>
        <div className="bg-white rounded-full p-2">
          <img src={url} alt="Profile" className="rounded-full h-80 w-80 object-cover" />
        </div>
      </div>
    }
     
    <div className='flex h-screen bg-slate-300 justify-center items-center'>
      <Header logoutModal={logoutModal} handleCancel={handleCancel} openLogoutModal={openLogoutModal} logout={true} handleLogout={handleLogout} />
      
      <div id='box' className='w-3/4 bg-white rounded p-6'>
        <button onClick={()=> navigate('/createUser')} className='bg-black hover:bg-slate-600  text-white font-bold py-2 px-4 rounded mb-4'>
          Add +
        </button>
        <input
        type="text"
        onChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search users..."
        className="mt-4 ml-2 p-2 border border-gray-300 rounded"
      />
        <div className="max-h-[400px] overflow-auto"> {/* Set max height and overflow */}
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Profile</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Age</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                  <img
                    onClick={(e)=>imageView(user.imageUrl,e)}
                    src={user.imageUrl} 
                    alt='Profile'
                    className='rounded-full cursor-pointer object-cover h-10 w-10'
                  />
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.email}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{user.age}</td>
                <td className='px-7 py-4 whitespace-nowrap'>
                <button onClick={(e)=> handleUpdateUser(user)}  className='text-indigo-600 hover:text-indigo-900'><BsPencilSquare/></button>
                <button onClick={(e)=> openModal(user._id,e)} className='text-red-600 hover:text-red-900 ml-2'><BsTrash/></button>
              </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminHome;
