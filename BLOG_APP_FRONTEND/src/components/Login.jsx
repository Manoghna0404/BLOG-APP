import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../store/authStore';
import { useEffect } from 'react';
import {toast} from 'react-hot-toast'

function Login() {
    const {register,handleSubmit,formState:{errors},reset} = useForm()
    const login=useAuth((state)=>state.login);
    const isAuthenticate=useAuth((state)=>state.isAuthenticate);
    const currentUser=useAuth((state)=>state.currentUser)
    const error=useAuth((state)=>state.error)
    const navigate=useNavigate()
    const [users,setUsers]=useState([])
    const onUserLogin=async(userCredObj)=>{
        await login(userCredObj)
        console.log(userCredObj)
        // reset()
    };
    useEffect(()=>{
        if(isAuthenticate && currentUser ){
            if(currentUser.role==="USER"){
                toast.success("Logged in successfully")
                navigate("/user-profile")
            }
            if(currentUser.role==="AUTHOR"){
                navigate("/author-profile")
            }
            if(currentUser.role==="ADMIN"){
                navigate("/admin-profile")
            }
        }
    },[isAuthenticate,currentUser])
  return (
    <div>
        <div>
            <form onSubmit={handleSubmit(onUserLogin)} className='bg-gray-100 text-center mt-7 w-full max-w-6xl rounded-sm p-6'>
                <h2 className='text-3xl mb-4'>Login</h2>
                <input type="text" {...register("email",{required:true})} placeholder='Email' className='bg-gray-300 mt-3 mb-2 p-2 w-full sm:w-[48%]'></input><br/>
                {
                    errors.email?.type==="required" && <p className='text-red-400'>Email is required</p>
                }
                <input type="text" {...register("password",{required:true})} placeholder='Password' className='bg-gray-300 mt-2 p-2 w-full sm:w-[48%]'></input><br/>
                {
                    errors.password?.type==="required" && <p className='text-red-400'>Password is required</p>
                }
                <button type="submit" className='bg-blue-300 p-2.5 rounded-3xl mt-3 w-full sm:w-[48%]'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login