import React, { useEffect } from 'react'
import Header from './userComponents/Header'
import Footer from './userComponents/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'

function userHome() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user = useSelector(state => state.users.user)
    axios.defaults.withCredentials=true
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://${Base_Url}/verifyUser`);
                dispatch(setUser(res.data.user))
            } catch (error) {
                navigate('/login')
                toast.error('Unauthorized',{
                    autoClose:1000,
                    position:'top-right'
                })
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    console.log(user , 'this is user from home')
  
    return (
        <>
            <Header home={true}/>
            <div className='w-full min-h-[87vh] bg-slate-300 relative'>
                <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-4xl font-bold'>Welcome, {user.name}</h1>
                <img src="https://static-cse.canva.com/blob/1369992/PerfectWebBannerAdfeaturedimage1.jpg" alt="Banner" className="w-full object-cover h-auto" style={{ maxHeight: '87vh' }} />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2">
                    <p className="text-sm">This is A Beginning Only.</p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default userHome
