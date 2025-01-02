import { CustomInput } from '@/components/common/Inputs/CustomInput'
import { Card } from '@/components/common/ui/card'
import { Checkbox } from '@/components/common/ui/checkbox'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/images/Griffin1.png'
import Cookies from 'js-cookie';
import useFetch from '../../../hooks/useFetch';
import { useAuth } from '../../../context/AuthContext';
import AdvancedLoading from '@/components/common/loading/AdvancedLoading';



const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();
    const { updateUser } = useAuth();
    const { data: loginData, loading: loadingLogin, fetchData: loginFetch } = useFetch('/login', {
        method: 'POST',
        data: formData,
        silent: false,
      });
    
      useEffect(() => {
        if (loginData?.success === true) {
          const accessToken = loginData.data.token;
          const userData = loginData.data.user;
          console.log(userData.role);
          Cookies.set('accessToken', accessToken);
          updateUser(userData);
         
          
          if (userData.role === "admin") {
            navigate('/admin/dashboard', { replace: true });
          } else if (userData.role === "manager") {
            navigate('/manager/category', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }
      }, [loginData, navigate, updateUser]);

    
     
    
    
    

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => { // Marked as async
        e.preventDefault();
        console.log(formData);
        await loginFetch(); 
    }
  
    
    return (
        <div   className='flex  background'>
              {loadingLogin && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
                <div className="flex justify-center items-center h-full min-h-[426px] py-auto">
                  <AdvancedLoading size="md" />
                </div>
              </div>
            )}
            <div className='bg-black/20 flex min-w-full justify-center items-center min-h-screen'>
            <Card className="bg-white pb-16 p-8 rounded-lg  shadow-md w-[400px]">
                <div className='flex w-32 h-32 justify-center mx-auto items-center border-[5px] rounded-full mb-4 text-[#212B37] font-bold'>
                    {/* <img src={logo} alt="Logo" /> */}
                    <img src={logo} alt="Logo" className='w-28 h-20 rounded-full' />
                    </div >
                <h2 className="text-2xl flex justify-center font-bold mb- text-black">Sign In</h2>
                <p className='flex justify-center mb-6 text-[#6E829F]'>Welcome back Admin</p>
                
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        type="email"
                        label="User Email "
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="User Email"
                        className="text-black  h-[40px]"
                        flexInputText="text-black flex"
                    />

                    <div className='flex justify-between mt-4'>
                        <p className='text-[#212B37] text-sm'>Password </p>
                        <div className="text-center">
                    <Link to="/forgot-password" className="text-[#6E829F] text-sm hover:underline">
                        Forgot password?
                    </Link>
                </div>
                    </div>
                    <CustomInput
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="text-gray-500  h-[40px]"
                        flexInputText="hidden "
                    />
                    <div className='flex gap-2 mt-5'>
                        <Checkbox className='w-4 h-4 text-gray-500' />
                        <p className='text-gray-500 text-sm'>Remember Password?</p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-400 text-white py-2  rounded hover:bg-opacity-90 transition duration-300 mt-8"
                        disabled={loadingLogin}
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-gray-600 mt-4 text-sm">Powered by <a href="https://similater.com/" target="_blank" rel="noopener noreferrer">Similater (PVT) LTD</a></p>
               
            </Card>
            </div>
        </div>
    )
}

export default Login
