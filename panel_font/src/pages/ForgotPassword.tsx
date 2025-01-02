/* eslint-disable react-hooks/exhaustive-deps */
import { CustomInput } from '@/components/common/Inputs/CustomInput'
import { Card } from '@/components/common/ui/card'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/images/Griffin1.png'
import useFetch from '@/hooks/useFetch'
import AdvancedLoading from '@/components/common/loading/AdvancedLoading'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const { data: ForgetPassword, loading: ForgetPasswordLoading,  fetchData: ForgetPasswordFetchData } = useFetch('/user/forgot-password');

    useEffect(() => {
        if (ForgetPassword?.status === true) {
            console.log(ForgetPassword)
            navigate('/otp-verification')
        }
    }, [])

    const handleChange = (name: string, value: string) => {
        setEmail(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle forgot password logic here
        console.log(email)
        await ForgetPasswordFetchData()
    }

    return (

        <div   className='flex  background'>
        <div className='bg-black/20 flex min-w-full justify-center items-center min-h-screen'>
        {ForgetPasswordLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
                <div className="flex justify-center items-center h-full min-h-[426px] py-auto">
                  <AdvancedLoading size="md" />
                </div>
              </div>
            )}
        <Card className="bg-white pb-16 p-8 rounded-lg  shadow-md w-[400px]">
        <div className='flex w-32 h-32 justify-center mx-auto items-center border-[5px] rounded-full mb-4 text-[#212B37] font-bold'>
                    {/* <img src={logo} alt="Logo" /> */}
                    <img src={logo} alt="Logo" className='w-28 h-20 rounded-full' />
                    </div >
            <h2 className="text-2xl flex justify-center font-bold mb- text-black">Forgot Password</h2>
            <p className='flex justify-center mb-6 text-[#6E829F]'>Enter your email to reset your password</p>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        type="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                        flexInputText="text-black flex"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#5C67F7]  text-white py-2 rounded hover:bg-opacity-90 transition duration-300 mt-6"
                    >
                        Send Reset Link
                    </button>
                </form>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword

