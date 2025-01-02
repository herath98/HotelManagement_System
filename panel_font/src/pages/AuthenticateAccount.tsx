import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomInput } from '@/components/common/Inputs/CustomInput'
import { Card } from '@/components/common/ui/card'
import logo from '@/assets/images/Griffin1.png'

const AuthenticateAccount = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const navigate = useNavigate()

  const handleChange = (index: number) => (name: string, value: string) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle OTP verification logic here
    console.log(otp.join(''))
    navigate('/reset-password')
  }

  return (
    <div   className='flex  background'>
    <div className='bg-black/20 flex min-w-full justify-center items-center min-h-screen'>
    <Card className="bg-white pb-16 p-8 rounded-lg  shadow-md w-[400px]">
    <div className='flex w-32 h-32 justify-center mx-auto items-center border-[5px] rounded-full mb-4 text-[#212B37] font-bold'>
                    {/* <img src={logo} alt="Logo" /> */}
                    <img src={logo} alt="Logo" className='w-28 h-20 rounded-full' />
                    </div >
        <h2 className="text-2xl flex justify-center font-bold mb- text-black">Authenticate Your Account</h2>
        <p className='flex justify-center mb-6 text-[#6E829F]'>Please enter the 6-digit code from your Authenticator app to complete your login.</p>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4 mb-6">
          {otp.map((digit, index) => (
            <CustomInput
              key={index}
              type="text"
              label=""
              name={`otp-${index}`}
              value={digit}
              onChange={handleChange(index)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-[#5C67F7] text-white py-2 rounded hover:bg-opacity-90 transition duration-300"
        >
          Verify OTP
        </button>
      </form>
      </Card>
    </div>
    </div>
  )
}

export default AuthenticateAccount;

