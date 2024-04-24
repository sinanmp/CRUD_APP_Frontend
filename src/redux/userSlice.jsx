import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[],
        admin:{
            email:'admin@gmail.com',
            password:'1234'
        },
        user:{}
    },
    reducers:{
        getUser : (state, action) =>{
            const payload = action.payload
            state.users = payload.map((user) => {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    age: user.age,
                    imageUrl:user.imageUrl
                };
            });
        },
        addUser : (state, action) => {
            state.users.push(action.payload)
            state.admin = state.admin
        },
        updateUserRedux : (state, action) => {
            const index = state.users.findIndex(x => x._id == action.payload.id)
            state.users[index] = {
                name:action.payload.name,
                age:action.payload.age,
                password:action.payload.passwrod,
                email:action.payload.email
            }
            state.admin=state.admin
        },

        deleteUser : (state, action) => {
            const id = action.payload.id
            state.users = state.users.filter(u => u._id !== id)
            state.admin= state.admin
        },

        adminLogin :(state,action) =>{
            console.log('adminLogin')
            console.log(state, ' this is state from slice')
            state.admin = {
                active:true,
                email:'admin@gmail.com',
                password:'1234'
            }
            state.users = state.users
        },

        adminLogout : (state, action) => {
            state.admin = {
                active:false,
                email:'admin@gmail.com',
                password:'1234'
            }
            state.users = state.users
        },

        setUser : (state,action)=>{
            state.user = action.payload
        },

        logoutUser : (state, action)=>{
            state.user={}
        }

    }
})

export const {getUser , addUser , updateUserRedux , deleteUser , adminLogin , adminLogout , setUser , logoutUser} = userSlice.actions
export default userSlice.reducer