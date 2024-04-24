import React, { useEffect, useState } from 'react'
import Header from './userComponents/Header'
import Footer from './userComponents/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../components/LoadingSpinner';
import Base_Url from '../baseUrl'


function userLogin() {

    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    axios.defaults.withCredentials=true

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://${Base_Url}/verifyUser`);
                if(res.data == 'Token is not available'){
                    navigate('/home')
                }
            } catch (error) {
                console.log(error,'erro');
            }
        };
        
        fetchData(); 
    }, []); 
    


    const handleSubmit=async()=>{
        try {
            setLoading(true)
            const response = await axios.post(`http://${Base_Url}/loginPost`,{
                email:email,
                password:pass
            })
            console.log(response.data)
            navigate('/home')
            toast.success('user logged in',{
                autoClose:1000,
                position:'top-right'
            })
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
      
    }
  return (
    <div>
    {loading && <LoadingSpinner />} 
        <Header/>
    <div className='w-full min-h-[90vh] bg-slate-300 flex items-center justify-center'>
    <div className='bg-white rounded-lg w-[35%] min-h-[65%]'>
    <h3 className='text-center mt-16 text-3xl font-medium' style={{ fontFamily: 'inherit' }}>
        <span style={{ color: '#FF3366' }}>U</span>
        <span style={{ color: '#33FF66' }}>N</span>
        <span style={{ color: '#6633FF' }}>L</span>
        <span style={{ color: '#FF9933' }}>O</span>
        <span>K</span>{' '}
        YOUR WORLD!
        </h3>

        <div className="p-8">
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
            </div>
            <div className="flex mt-10 justify-center">
                <button onClick={handleSubmit} className="bg-black hover:text-slate-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">Login</button>
            </div>
            <p className='text-center mt-4 cursor-pointer'>Don't have an account? <span onClick={()=> navigate('/signup')} className='text-blue-600'>Sign Up</span></p>
        </div>
    </div>
</div>
<Footer/>
    </div>
  )
}

export default userLogin
