import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from '../components/ConfirmationModal';
import Base_Url from '../baseUrl';


function CreateUser() {
  const admin = useSelector(state => state.users.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [modal , setModal] = useState(false)
  const [event , setEvent] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password:'',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(admin.active==false){
      navigate('/adminLogin')
      toast.error('not authenticated',{
        autoClose:1000,
        position:'top-right'
      })
    }
  })
   const [url , setUrl] = useState('')

  const handleImageUpload = (e) => {
    e.preventDefault()
    // Extract the image URL from the Cloudinary response
    const imageUrl = e.target.files[0]
    setUrl(URL.createObjectURL(imageUrl));
    setFormData({
      ...formData,
      imageUrl: imageUrl,
    });
  };


  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validation = (name , email, password , age)=>{
        if(!name && !email && !password  && !age ){
           const name = document.getElementById('name')
           const password = document.getElementById('password')
           const age = document.getElementById('age')
           const email = document.getElementById('email')
           name.classList.add('shake')
           password.classList.add('shake')
           age.classList.add('shake')
           email.classList.add('shake')
           name.style.border='solid red 2px'
           password.style.border='solid red 2px'
           age.style.border='solid red 2px'
           email.style.border='solid red 2px'
            toast.error('please fill all details',{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }

        if(!name){
           const name = document.getElementById('name')
            name.style.border='solid red 2px'
            name.classList.add('shake')
            toast.error('please enter the name',{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }else{
            const name = document.getElementById('name')
            name.style.border='solid gray 2px'
        }

        if(!email){
            const email = document.getElementById("email")
            email.style.border='solid 2px red'
            toast.error('please enter the email!',{
                autoClose:1000,
                position:'top-center'
            })
            email.classList.add('shake')
            return 'error'
        }else{
            const email = document.getElementById("email")
            email.style.border='solid 2px gray'
        }
        
        if(!age){
            const age = document.getElementById('age')
            age.style.border = 'solid red 2px'
            toast.error('please enter the age!',{
                autoClose:1000,
                position:'top-center'
            })
            age.classList.add('shake')
            return 'error'
        }else{
            const age = document.getElementById('age')
            age.style.border = 'solid gray 2px'
        }

        if(age < 18){
            const age = document.getElementById('age')
            age.style.border = 'solid 2px red'
            age.classList.add('shake')
            toast.error("age must need more that 18 !",{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }else if(age <=0){
            const age = document.getElementById('age')
            age.style.border = 'solid 2px red'
            age.classList.add('shake')
            toast.error("please enter a valid age",{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }


        if(name.trim()==''){
           const name = document.getElementById('name')
           name.style.border='solid red 2px'
            name.classList.add('shake')
            toast.error('please enter a name!',{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }

        if(password.trim()==''){
            document.getElementById('password').style.border='solid 2px red'
            toast.error('please enter a valid password',{
                autoClose:1000,
                position:'top-center'
            })
            return 'error'
        }
  }

  const handleSubmit = async() => {
    setLoading(true)
    setModal(false)
    try {
        const {name , email, password , age} = formData
       const action =await validation(name , email , password , age)
       if(action=='error'){
          return
       }
       const data = new FormData()
       console.log('this is image url which iam founding' , formData.imageUrl)
       data.append('file',formData.imageUrl)
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


       console.log(secure_url ,' this is secure url')
        
      const result = await axios.post(`http://${Base_Url}/createUser`,{
        name:name,
        email:email,
        age:age,
        password:password,
        imageUrl:secure_url
      })

      if(result.data == 'user is already exist'){
        const email = document.getElementById('email')
        toast.error('email is already exist',{
            autoClose:1000,
            position:'top-center'
        })
        email.style.border= 'solid 2px red'
        email.classList.add('shake')
        return
      }
    //   dispatch(addUser(result.data))
      toast.success('user created successfully',{
        autoClose:1000,
        position:'top-center'
      })
      navigate('/adminHome')
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
  };

  const handleCancel =() =>{
    setModal(false)
  }

  const openModal = (e)=>{
    e.preventDefault()
    setModal(true)
  }

  const handleChangeImage = ()=>{
      const input = document.getElementById('image')
      input.click()
  }

  return (
    <>
     {loading && <LoadingSpinner />} 
      <Header />
      <ConfirmationModal
                isOpen={modal}
                title="Confirmation"
                message="Are you sure to add this user?"
                onCancel={handleCancel}
                onConfirm={handleSubmit}
        />
      <div className='w-full bg-slate-300 flex justify-center items-center h-screen'>
      <>
  {url &&
  <div className="fixed top-0 z-20 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-full p-2 flex flex-col items-center">
      <img src={url} alt="Profile" className="rounded-full h-60 w-60 object-cover" />
      <div className="mt-2 absolute bottom-[10rem]">
        <button onClick={handleChangeImage} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2">Change</button>
        <button onClick={()=> setUrl(false)} className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded" >Upload</button>
      </div>
    </div>
  </div>
  }
  <div>
    {/* Your other content here */}
  </div>
</>

        <div id='box' className='w-[40%] relative  block mt-10 bg-white rounded-lg p-8'>
          <button onClick={()=>navigate('/adminHome')} className='absolute top-3 left-3'><FaArrowLeft/></button>
          <h2 className='text-2xl font-bold mb-4'>Create User</h2>
          <form onSubmit={(e)=>openModal(e)}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter your name'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter your email'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='age' className='block text-gray-700 font-bold mb-2'>Age</label>
              <input
                type='number'
                id='age'
                name='age'
                value={formData.age}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter your age'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='age' className='block text-gray-700 font-bold mb-2'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Enter your age'
              />
            </div>
            <div className='mb-6'>
              <input type="file" id='image' accept='image/*' name='image' onChange={(e)=>handleImageUpload(e)} />
            </div>
            <button
              type='submit'
              className='bg-black hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Create User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
