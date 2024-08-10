'use client'

import api from '@/config'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Register = () => {
    const router = useRouter()

    interface UserData {
        name: string;
        email: string;
        password: string;
    }
    
    interface ApiResponse {
        success: boolean;
        message: string;
    }

    const [userData, setUserData] = useState<UserData>({
        name: "",
        email: "",
        password: ""
    })

    const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const { name, email, password } = userData

        if (name && email && password) {
            try {
                const response = await api.post<ApiResponse>("/register", { userData })
                
                if (response.data.success) {
                    setUserData({ name: "", email: "", password: "" })
                    router.push("/login")
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || "An error occurred")
            }
        } else {
            toast.error("Please fill all the details!")
        }
    }

    return (
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-violet-300'>
            <div className='h-auto w-1/3 flex items-center justify-center flex-col py-14 shadow rounded-lg bg-white'>
                <h1 className='text-3xl font-semibold'>Welcome to <span className='text-violet-600'>TM</span>!</h1>
                <form className='w-4/5 flex flex-col items-center' onSubmit={handleRegisterSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='Full name'
                        onChange={handleChangeValues}
                        value={userData.name}
                        className='h-10 w-full rounded-md mt-10 mb-5 p-3 bg-slate-100'
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Your email'
                        onChange={handleChangeValues}
                        value={userData.email}
                        className='h-10 w-full rounded-md mb-5 p-3 bg-slate-100'
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={handleChangeValues}
                        value={userData.password}
                        className='h-10 w-full rounded-md mb-5 p-3 bg-slate-100'
                    />
                    <button type='submit' className='h-10 w-full rounded-md bg-violet-600 text-white shadow'>
                        Sign up
                    </button>
                    <p className='my-5'>
                        Already have an account? <Link href="/login" className='text-violet-600'>Log in.</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
