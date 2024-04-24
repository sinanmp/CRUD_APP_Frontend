import React, { useEffect, useState } from 'react';
import Header from './userComponents/Header';
import Footer from './userComponents/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import verifyUser from '../services/verifyUser';
import { toast } from 'react-toastify';
import Base_Url from '../baseUrl';

function ProfileImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await verifyUser();
        console.log(res,' this is res i n image')
        if (res) {
          setUser(res);
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', selectedImage);
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
      if(response.data.success){
        navigate('/home');
        dispatch(setUser(response.data.user));
        toast.success('Profile image updated', {
          autoClose: 1000
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <>
      <Header />
      {loading && <LoadingSpinner />}
      <div className="flex flex-col min-h-[90vh] bg-slate-300 items-center justify-center h-full">
        <h1 className="text-xl font-semibold mt-8 mb-4">CHOOSE PROFILE IMAGE</h1>
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageInput" />
        <label htmlFor="imageInput" className="cursor-pointer">
          <div className="relative w-40 h-40 rounded-full border border-gray-300 flex items-center justify-center">
            <img
              src={selectedImage ? selectedImage : 'https://www.pngkey.com/png/detail/52-523516_empty-profile-picture-circle.png'}
              alt="Selected"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          </div>
        </label>
        <div className="mt-4 block">
          {selectedImage && (
            <button onClick={handleUpdate} className=" bg-black text-white py-1 px-2 rounded-md">
              Update
            </button>
          )}
          {!selectedImage &&
            <button onClick={handleSkip} className="text-sm text-gray-600 underline cursor-pointer">Skip</button>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileImage;
