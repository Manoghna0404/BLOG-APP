import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'

function AddArticle() {
    const {register,handleSubmit,formState:{errors},reset} = useForm()
        const [article,setArticle]=useState([])
        const submitForm=(obj)=>{
            setArticle([...article,obj])
            console.log(obj)
            reset()
        }
  return (
    <div>
        <div>
            <form onSubmit={handleSubmit(submitForm)} className='bg-gray-100 text-center mt-7'>
                <h2 className='text-3xl mb-4'>Add Article</h2>
                <input type="text" {...register("title",{required:true})} placeholder='Title' className='bg-gray-300 mt-3 mb-3 p-2'></input><br/>
                {
                    errors.title?.type==="required" && <p className='text-red-400'>Title is required</p>
                }
                <select {...register("category",{required:true})} className="bg-gray-300 p-2 mb-3 mt-3">
                    <option value="">Category</option>
                    <option value="User">User</option>
                    <option value="Author">Author</option>
                </select><br/>
                {
                    errors.category?.type==="required" && <p className='text-red-400'>category is required</p>
                }
                <input type="text" {...register("content",{required:true})} placeholder='Content' className='bg-gray-300 mt-2 p-10'></input><br/>
                {
                    errors.content?.type==="required" && <p className='text-red-400'>content is required</p>
                }
                <button type="submit" className='bg-blue-300 p-2.5 rounded-3xl mt-3'>Publish Article</button>
            </form>
        </div>
    </div>
  )
}

export default AddArticle