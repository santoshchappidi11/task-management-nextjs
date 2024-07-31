'use client';

import api from '@/config'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useMyContext } from '../context/MyContext'
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter()

  const {Login} = useMyContext()

  interface User {
    id: string;
    name: string;
    email: string;
  }

  interface UserData {
    email:string;
    password:string;
  }

  interface ApiResponse{
    success:boolean;
    message:string;
    user?:User;
    token:string;
  }



  const [userData, setUserData] = useState<UserData>({email:"", password:""})

  const handleChangeValues = (e:any) => {
    setUserData({...userData,[e.target.name]:e.target.value})
  }

  const handleLoginSubmit = async(e:FormEvent) => {
    e.preventDefault()


    if(userData?.email && userData?.password){
      try {
        const response = await api.post<ApiResponse>("/login", {userData})
        if(response?.data?.success){
          if (response.data.user) {
            localStorage.setItem("Token",JSON.stringify(response.data.token))
            // Pass the User object to the Login function
            Login(response.data.user);
            setUserData({ email: "", password: "" });
            alert(response.data.message);
            router.push("/dashboard")
          } else {
            console.error('User data is missing in the response.');
            alert('Login was successful, but user data is missing.');
          }
        }else{
          alert(response.data.message)
        }
      } catch (error:any) {
        alert(error.response.data.message)
      }
    }else{
      alert('Please fill all the details!')
    }
  }


  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-violet-300'>
        <div className='h-auto w-1/3 flex items-center justify-center flex-col py-14 shadow rounded-lg bg-white'>
            <h1 className='text-3xl font-semibold'>Welcome to <span className='text-violet-600'>Workflo</span>!</h1>
            <form onSubmit={handleLoginSubmit} className='w-4/5 flex items-center justify-center flex-col'>
                <input type='text' name='email' placeholder='Your email' onChange={handleChangeValues} value={userData.email} className='h-10 w-11/12  rounded-md mt-10 mb-5 p-3 bg-slate-100'/>
                <input type='password' name='password' placeholder='Password' onChange={handleChangeValues} value={userData.password} className='h-10 w-11/12  rounded-md mb-5 p-3 bg-slate-100' />
                <button type='submit' className='h-10 w-11/12 rounded-md bg-violet-600 text-white shadow'>Login</button>
               <p className='my-5'>Dont have an account? Create a <Link href="/register" className='text-violet-600'>new account.</Link></p> 
            </form>
        </div>
    </div>
  )
}

export default Login