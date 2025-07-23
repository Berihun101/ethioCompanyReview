"use client"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { handleLogin } from "@/app/lib/actions"
import apiService from "@/app/services/apiServices"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useUserDetail from "@/app/hooks/useUserDetail"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const { setUser } = useUserDetail()
    const router = useRouter()
    const googleButtonRef = useRef<HTMLDivElement>(null)
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Cleanup Google Sign-In when component unmounts
    useEffect(() => {
        setMounted(true)
        return () => {
            // Cleanup Google Sign-In
            const googleSignInElements = document.querySelectorAll('.google-signin-button');
            googleSignInElements.forEach(el => el.innerHTML = '');
        }
    }, [])

    const submitLogin = async () => {
        setIsLoading(true)
        setErrors([])
        
        try {
            const formData = {
                username: username,
                password: password
            }
            const response = await apiService.postWithoutToken('auth/login/', JSON.stringify(formData))
            
            if(response.access) {
                const userDetail = await apiService.get(`auth/${response.user.pk}`)
                handleLogin(response.user.pk, response.access, response.refresh)
                setUser(userDetail)
                loginModal.close()
            } else {
                setErrors(response.non_field_errors || ["Invalid credentials"])
            }
        } catch (error) {
            setErrors(["An error occurred during login"])
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const payload = {
                auth_token: credentialResponse.credential
            };

            const response = await apiService.postWithoutToken(
                'auth/google/',
                JSON.stringify(payload)
            );
            
            if (response.access) {
                const userDetail = await apiService.get(`auth/${response.user_id}`);
                handleLogin(response.user_id, response.access, response.refresh);
                setUser(userDetail);
                loginModal.close();
            }
        } catch (error) {
            console.error('Google login error:', error);
            setErrors(["Google login failed. Please try again."]);
        }
    };

    const handleGoogleFailure = () => {
        setErrors(["Google login failed"]);
    };

    const openModal = () => {
        loginModal.close()
        registerModal.open()
    }

    const content = (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="">
                    <div className="p-6 md:p-8">
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
                                <Input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    id="password" 
                                    type="password" 
                                    required 
                                />
                            </div>
                            {errors.map((error, index) => (
                                <div key={index} className="p-2 text-error rounded-xl">
                                    {error}
                                </div>
                            ))}
                            <Button 
                                onClick={submitLogin} 
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Logging in...
                                    </>
                                ) : "Login"}
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                            <div className="flex justify-center">
                                <div ref={googleButtonRef} id="google-signin-button">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleFailure}
                                        useOneTap
                                        auto_select
                                        ux_mode="popup"
                                        shape="rectangular"
                                        size="large"
                                        text="continue_with"
                                        cancel_on_tap_outside={false}
                                        context="signin"
                                    />
                                </div>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a onClick={openModal} href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <Modal
            isopen={loginModal.isOpen}
            close={loginModal.close}
            label="Login"
            content={content}
        />
    )
}

export default LoginModal;