import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector , useDispatch} from 'react-redux'
import { adminLogin } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie';
function AdminLogin() {
   const dispatch = useDispatch()
    const admin = useSelector(state => state.users.admin)
    console.log(admin , 'admin from login')
    const users = useSelector(state => state.users.users)
    console.log(users , 'users from login')
    const [email , setEmail] = useState('')
    const [pass , setPass] = useState('')
    const navigate = useNavigate()
    const adminAuth = Cookies.get('adminAuth')

    useEffect(()=>{
        if(adminAuth=='true'){
            navigate('/adminHome')
        }
    },[])

    const handleSubmit = ()=>{
        try {
            if(email==admin.email && pass == admin.password){
                dispatch(adminLogin())
                toast.success('admin logged In',{
                    autoClose:1000,
                    position:'top-right'
                })
                Cookies.set('adminAuth','true')
                navigate('/adminHome')
            }else{
                Cookies.set('adminAuth','false')
                toast.error('invalid credentials',{
                    autoClose:1000,
                    position:'top-center'
                })
                const email = document.getElementById('email')
                email.style.border = 'solid red 2px'
                email.classList.add('shake')
                const pass = document.getElementById('password')
                pass.style.border = 'solid 2px red'
                pass.classList.add('shake')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <Header/>
    <div className='w-full h-screen bg-slate-300 flex items-center justify-center'>
    <div className='bg-white rounded-lg w-[35%] min-h-[65%]'>
        <img src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png" alt="Admin" className="mx-auto rounded-lg mt-8" style={{  height: '80px' }} />
        <h1 className='text-center mt-8 text-4xl font-medium text-slate-800 unde' style={{fontFamily:'inherit'}}>Admin Login</h1>
        <div className="p-8">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input onChange={(e)=>setPass(e.target.value)} value={pass} type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
            </div>
            <div className="flex justify-center">
                <button onClick={handleSubmit} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">Login</button>
            </div>
        </div>
    </div>
</div>


    </>
  )
}

export default AdminLogin
