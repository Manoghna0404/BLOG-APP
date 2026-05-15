import React from 'react'
import {useForm} from 'react-hook-form'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router'
import { errorClass, loadingClass } from '../styles/common'
import { toast } from 'react-hot-toast'

function Register() {
    const {register,handleSubmit,formState:{errors},reset}=useForm()
    const [users,setUsers]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [preview,setPreview]=useState(null)
    const navigate=useNavigate()
    const onUserRegister=async(newUser)=>{
        setLoading(true)
        console.log(newUser)
        // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profileImageUrl to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profileImageUrl to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);
        try{
        let {role,...userObj}=newUser
        if(role==="User"){
            //make api req to user-api
            let resObj=await axios.post("http://localhost:4000/user-api/users",formData)
            console.log('res obj is',resObj)
            if(resObj.status===201){
                toast.success("Registration successful! Please login.")
                //navigate to login
                navigate('/login')
            }
        }
        if(role==="Author"){
            //make api req to user-api
            let resObj=await axios.post("http://localhost:4000/author-api/users",formData)
            console.log('res obj is',resObj)
            if(resObj.status===201){
                //navigate to login
                navigate('/login')
        }
        }
        if(role==="Admin"){
            //make api req to user-api
            let resObj=await axios.post("http://localhost:4000/admin-api/users",formData)
            console.log('res obj is',resObj)
            if(resObj.status===201){
                //navigate to login
                navigate('/login')
        }
        }
    }catch(err){
            console.log(err.message)
            setError(err.response?.data?.error || "Registration failed")
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);

        if(loading===true){
            return <p className={loadingClass}>Loading...</p>
        }
        
  return (
    <div>
        <div>
            <form onSubmit={handleSubmit(onUserRegister)} className='bg-gray-100 text-center mt-7 w-full max-w-6xl px-6 sm:px-10 md:px-16 py-10 rounded-sm'>
                <h2 className='text-3xl mb-4'>Registration</h2>
                {error && <p className={errorClass}>{error}</p>}
                <div className='w-full sm:w-[48%] text-center md:ml-40 lg:ml-40'>
                    <label className='mr-5'>
                        <input type="radio" {...register("role", { required: true })} name='role' value="User" className='mr-2'/>User
                    </label>
                    <label>
                        <input type="radio" {...register("role", { required: true })} name='role' value="Author" className='mr-2'/>Author
                    </label>
                    <label>
                        <input type="radio" {...register("role", { required: true })} name='role' value="Admin" className='mr-2'/>Admin
                    </label>
                </div>
                <div>
                    <input type="text" {...register("firstName",{required:true})} placeholder='FirstName' className='bg-gray-300 p-2 mt-3.5 mr-2.5 w-full sm:w-[48%]'></input><br/>
                {
                    errors.firstName?.type==="required" && <p className='text-red-400'>Firstname is required</p>
                }
                <input type="text" {...register("lastName",{required:true})} placeholder='LastName' className='bg-gray-300 p-2 mt-2.5 w-full sm:w-[48%]'></input><br/>
                </div>
                <input type="text" {...register("email",{required:true})} placeholder='Email' className='bg-gray-300 mt-3 mb-2 p-2 w-full sm:w-[48%]'></input><br/>
                {
                    errors.email?.type==="required" && <p className='text-red-400'>Email is required</p>
                }
                <input type="text" {...register("password",{required:true})} placeholder='Password' className='bg-gray-300 mt-2 p-2 w-full sm:w-[48%]'></input><br/>
                {
                    errors.password?.type==="required" && <p className='text-red-400'>Password is required</p>
                }
                <div>
                    <input type="file" accept="image/png, image/jpeg" {...register("profileImageUrl")} className='bg-gray-300 mt-3 mb-2 p-2 w-full sm:w-[48%]'
                onChange={(e) => {
                 //get image file
                const file = e.target.files[0];
                // validation for image format
                if (file) {
                    if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setError("Only JPG or PNG allowed");
                    return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                    setError("File size must be less than 2MB");
                    return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }

        }} />
        {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
                </div>
                <button type="submit" className='bg-blue-300 p-2.5 rounded-3xl sm:w-auto'>Register</button>
            </form>
        </div>
    </div>
  )
}
export default Register