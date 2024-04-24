import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from './userComponents/Footer';
import Header from './userComponents/Header';
import { FiArrowLeft } from 'react-icons/fi';
import { logoutUser, setUser } from '../redux/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal';
import LoadingSpinner from '../components/LoadingSpinner';
import Base_Url from '../baseUrl';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const [modal, setModal] = useState(false);
  const [loading , setLoading] = useState(false)
  const [url , setUrl]=useState('')
  const [newUrl , setNewUrl] = useState('')
  const [urlForUpdate, setUrlForUpdate] = useState('')
  useEffect(() => {
    if (!user.email) {
      navigate('/home');
    }
  }, [user.email, navigate]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLogout = async () => {
    try {
      const data = await axios.get(`http://${Base_Url}/logoutUser`);
      if (data.data.message === 'Logout successful') {
        dispatch(logoutUser())
        navigate('/login');
      } else {
        console.log('something problem in logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  const modalOpen = () => {
    setModal(true);
  };

  const openInput=(e)=>{
    const input = document.getElementById('image')
    input.click()
  }


  const handleImageUpdate = async()=>{
    setLoading(true)
    try {
        const data = new FormData()
        data.append('file',urlForUpdate)
        data.append("upload_preset", "image-upload");
        data.append("cloud_name", "ddklqavip");
  
   
          let api = "https://api.cloudinary.com/v1_1/ddklqavip/image/upload";
          const res = await axios.post(api, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: false,
          });
 
          const { secure_url } = res.data;

          const response = await axios.post(`http://${Base_Url}/imageUpdate`, {
            email: user.email, 
            imageUrl: secure_url
          });

          const reduxData ={
            email:user.email,
            name:user.name,
            imageUrl:secure_url
          }
          dispatch(setUser(reduxData))
          toast.success('Image Updated',{
            autoClose:1000,
            position:'top-center'
          })
    } catch (error) {
        console.log(error)
    } finally{
        setLoading(false)
        setNewUrl(false)
    }
  }


  const imageModal = (e) =>{
    const imageUrl = e.target.files[0]
    setNewUrl(URL.createObjectURL(imageUrl));
    setUrlForUpdate(imageUrl)
    console.log(imageUrl , 'this is imageUrl')
  }

  return (
    <>
      {loading && <LoadingSpinner  />} 
      <Header />
      {url &&
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={() => setUrl(false)}>
        <div className="bg-black rounded-full p-3">
          <img  src={url} alt="Profile" className="rounded-full h-[500px] w-[500px] object-cover" />
        </div>
      </div>
    }

{newUrl &&
  <div className="fixed top-0 z-20 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-full p-2 flex flex-col items-center">
      <img src={newUrl} alt="Profile" className="rounded-full h-60 w-60 object-cover" />
      <div className="mt-2 absolute bottom-[10rem]">
        <button onClick={openInput} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2">Change</button>
        <button onClick={handleImageUpdate} className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded" >Upload</button>
      </div>
    </div>
  </div>
  }
      <ConfirmationModal
        isOpen={modal}
        title="Confirmation"
        message="Are you sure to Logout?"
        onCancel={handleCancel}
        onConfirm={handleLogout}
      />
      <div className='min-w-full h-screen bg-slate-300 flex justify-center items-center'>
        <div className='max-w-lg w-full bg-white shadow-md rounded-lg p-8 flex justify-between items-start'>
          <div className='flex-shrink-0 mr-8'>
            <button className='text-gray-500 hover:text-gray-700 focus:outline-none' onClick={handleBack}>
              <FiArrowLeft className='w-6 h-6' />
            </button>
            <input type="file" onChange={imageModal} name="image" id="image" accept="image/*" hidden />
            <img onClick={()=> setUrl(user.imageUrl)} src={user.imageUrl} className='rounded-full cursor-pointer w-24 h-24 object-cover mt-2' alt='' />
            <p className='ml-1 mt-1'>Profile Photo</p>
            <p onClick={openInput} className='ml-5 mt-1 cursor-pointer text-blue-600'>Change</p>
          </div>
          <div className='mt-14'>
            <h2 className='text-xl font-bold text-gray-800 mb-2'>{user.name}</h2>
            <p className='text-sm text-gray-600 mb-4'>{user.email}</p>
            {/* Add more profile details here */}
          </div>
          <button className='bg-black mt-16 text-red-700 hover:text-white px-4 py-2 rounded hover:bg-red-600' onClick={modalOpen}>Logout</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;
