"use client"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import Modal from "./Modal"

import { useState } from "react"
import CustomButton from "../forms/CustomButton"
import { useRouter } from "next/navigation"
import apiService from "@/app/services/apiServices"
import { handleLogin } from "@/app/lib/actions"
import useLoginModal from "@/app/hooks/useLoginModal"

const RegisterModal = () =>{
    const signupModal = useRegisterModal()
    const loginModal = useLoginModal()

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const submitSignup = async () => {
        const formData = {
            email: email,
            username: username,
            password1: password1,
            password2: password2
        }

        const response = await apiService.postWithoutToken('/auth/register/', JSON.stringify(formData))

        if ( response.access) {
           handleLogin(response.user.pk, response.acess, response.refresh)

            signupModal.close()
            
        }else{
            const tempErrors: string[] = Object.values(response).map((error:any) =>{
                return error 
            })
            setErrors(tempErrors)
        }
    }

    const openModal = () => {
        loginModal.open()
        signupModal.close()

    }

    const content = (
        <>
       
        <form action={submitSignup}>
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Type your username" className=" rounded-xl w-full h-[54px] border border-gray-300 mb-4 px-4" />
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Type your email" className=" rounded-xl w-full h-[54px] border border-gray-300 px-4" />
            <input onChange={(e) => setPassword1(e.target.value)}  type="password" placeholder="Type your password" className="rounded-xl w-full h-[54px] border border-gray-300 px-4 mt-4" />
            <input onChange={(e) => setPassword2(e.target.value)}  type="password" placeholder="Please repeat the password" className="rounded-xl w-full h-[54px] border border-gray-300 px-4 mt-4" />
       
            {errors.map((error, index) =>{
                return(
                    <div key={index} className=" mt-3 p-4 bg-airbnb text-red rounded-xl opacity-80">
                        {error}
                    </div>
                )
             })}

            <CustomButton 
             label="Signup"
             onClick={submitSignup}
             className="w-full mt-4 text-center"
             />

             <span>already have an account?</span> <a href="#" onClick={openModal} className="text-primary">Login</a>
             
        </form>
        </>
    )
    return (
        <Modal
            isopen={signupModal.isOpen}
            close={signupModal.close}
            label="Signup "
            content={content}
            />
    )
}

export default RegisterModal