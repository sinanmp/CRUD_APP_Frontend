import React, { useEffect, useReducer, useState } from 'react'
import Header from './userComponents/Header'
import Footer from './userComponents/Footer'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';
const SET_PASSWORD = 'SET_PASSWORD';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}


function userSignUp() {
    const navigate = useNavigate()
    const initialState = {
        name: '',
        email: '',
        password: '',
      };
      const reduxDispatch = useDispatch()
    
      // Initialize state using useReducer
      const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(()=>{
        try {
          const verifyUser = async ()=>{
            const res = await axios.get('http://${Base_Url}/verifyUser')
            console.log(res.data)
            if(res.data.message){
              reduxDispatch(setUser(res.data.user))
              navigate('/home')
            }
          }
          verifyUser()
        } catch (error) {
          console.log(error)
        }
      })
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'name':
            dispatch({ type: SET_NAME, payload: value });
            break;
          case 'email':
            dispatch({ type: SET_EMAIL, payload: value });
            break;
          case 'password':
            dispatch({ type: SET_PASSWORD, payload: value });
            break;
          default:
            break;
        }
      };
      axios.defaults.withCredentials= true
      const handleSubmit = async(e)=>{
        e.preventDefault()
            try {
              const response = await  axios.post(`http://${Base_Url}/signupPost`,{
                    name:state.name,
                    email:state.email,
                    password:state.password
                })
                if(response.data.user){
                    navigate('/profileImage')
                    toast.success("user logged in ",{
                        autoClose:1000,
                        position:'top-right'
                    })
                }
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
      }


  return (
    <div>
    <Header/>
    <div className='w-full min-h-[100vh] bg-slate-300 flex items-center justify-center'>
    <div className='bg-white rounded-lg w-[35%] min-h-[65%]'>
    <h3 className='text-center mt-16 text-3xl font-medium' style={{ fontFamily: 'inherit' }}>
        <span style={{ color: '#FF3366' }}>C</span>
        <span style={{ color: '#33FF66' }}>R</span>
        <span style={{ color: '#6633FF' }}>E</span>
        <span style={{ color: '#FF9933' }}>A</span>
        <span>T</span>{' '}
        YOUR WORLD!
        </h3>
        <div className="p-8">
            <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Username</label>
                <input type="text" id="name" value={state.name} onChange={handleInputChange} name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your username" />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input onChange={handleInputChange} value={state.email} type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input onChange={handleInputChange} value={state.password} type="password" id="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" />
            </div>
            <div className="flex mt-10 justify-center">
                <button onClick={handleSubmit} className="bg-black hover:text-slate-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline">Login</button>
            </div>
            <p className='text-center mt-4 cursor-pointer'>Do you have a account? <span className='text-blue-600' onClick={()=>navigate('/login')}>LogIn</span></p>
        </div>
    </div>
</div>
<Footer/>

    </div>
  )
}

export default userSignUp
