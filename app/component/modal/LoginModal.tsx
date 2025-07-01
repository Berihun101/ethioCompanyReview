"use client"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import { useState, useEffect } from "react"
import CustomButton from "../forms/CustomButton"
import { useRouter } from "next/navigation"
import { handleLogin } from "@/app/lib/actions"
import apiService from "@/app/services/apiServices"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useUserDetail from "@/app/hooks/useUserDetail"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const LoginModal = () =>{
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const { setUser } = useUserDetail()

    const router = useRouter()
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<string[]>([])

    const submitLogin = async () =>{
        const formData = {
            username: username,
            password: password
        }
        const response = await apiService.postWithoutToken('auth/login/', JSON.stringify(formData))
        
        if(response.access){
            
            const userDetail = await apiService.get(`auth/${response.user.pk}`);
            handleLogin(response.user.pk, response.access, response.refresh)
            setErrors([])
            setUser(userDetail)
            loginModal.close()
            
        }else{
            setErrors(response.non_field_errors)
        }
    }

    const openModal = () => {
        loginModal.close()
        registerModal.open()

    }

    const content = (
        <>
      
         <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="">
          <form action={submitLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
              </div>
              {errors.map((error, index) =>{
                return (
                    <div key={index} className="p-2 text-error rounded-xl">
                        {error}
                    </div>
                )
             })}
              <Button onClick={submitLogin} type="submit" className="w-full">
                Login
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
               
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
               
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a onClick={openModal} href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        
        </CardContent>
      </Card>
    
    </div>
   
       
        {/* <form action={submitLogin}>
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Type your username" className=" rounded-xl w-full h-[54px] border border-gray-300 mb-4 px-4" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Type your password" className="rounded-xl w-full h-[54px] border border-gray-300 px-4 mt-4" />

             {errors.map((error, index) =>{
                return (
                    <div key={index} className="p-4 mt-3 text-red rounded-xl">
                        {error}
                    </div>
                )
             })}

            <CustomButton 
             label="Login"
             onClick={submitLogin}
             className="w-full mt-4 text-center"
             />
             <span className="text-gray">I don't have an account?</span> <a href="#" onClick={openModal} className="text-primary">Signup</a>
        </form> */}
        </>
    )
    return (
        <Modal
            isopen={loginModal.isOpen}
            close={loginModal.close}
            label="Login "
            content={content}
            />
    )
}

export default LoginModal