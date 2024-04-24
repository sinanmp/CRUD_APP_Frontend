import React from 'react'
import AdminHome from './adminSide/AdminHome'
import { Route , Routes } from 'react-router-dom'
import CreateUser from './adminSide/createUser'
import UpdateUser from './adminSide/updateUser'
import AdminLogin from './adminSide/AdminLogin'
import { useSelector } from 'react-redux'
import UserLogin from './userSide/userLogin'
import UserSignUp from './userSide/userSignUp'
import UserHome from './userSide/userHome'
import ProfileImage from './userSide/profileImga'
import ProfilePage from './userSide/ProfilePage'

function App() {
  const admin = useSelector(state => state.users.admin)
  console.log(admin , 'admin from app')
  return (
    <>
    <Routes>
      <Route path='/adminHome' element={<AdminHome/>}></Route>
      <Route path='/' element={<UserLogin/>}></Route>
      <Route path='/' element={<AdminHome/>}></Route>
      <Route path='/createUser' element={<CreateUser/>}></Route>
      <Route path='/updateUser/:id' element={<UpdateUser/>}></Route>
      <Route path='/adminLogin' element={<AdminLogin/>}></Route>
      <Route path='/login' element={<UserLogin/>}></Route>
      <Route path='/signup' element={<UserSignUp/>}></Route>
      <Route path='/home' element={<UserHome/>}></Route>
      <Route path='/profileImage' element={<ProfileImage/>}></Route>
      <Route path='/profile' element={<ProfilePage/>}></Route>

    </Routes>
    </>
  )
}

export default App
