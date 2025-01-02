import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomInput } from '@/components/common/Inputs/CustomInput';
import { Card } from '@/components/common/ui/card';
import logo from '@/assets/images/Griffin1.png'
import CustomCheckbox from '@/components/common/CustomCheckbox';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  
  const [requirements, setRequirements] = useState({
    eightChars: false,
    hasSymbol: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    passwordsMatch: false
  });
  
  const navigate = useNavigate();

  const checkPasswordRequirements = (password: string, confirmPassword: string) => {
    setRequirements({
      eightChars: password.length >= 8,
      hasSymbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      passwordsMatch: password === confirmPassword && password !== ''
    });
  };

  const handleChange = (name: string, value: string) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    checkPasswordRequirements(
      name === 'password' ? value : formData.password,
      name === 'confirmPassword' ? value : formData.confirmPassword
    );
  };

  const allRequirementsMet = Object.values(requirements).every(req => req === true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) {
      alert("Please meet all password requirements");
      return;
    }
    console.log(formData);
    navigate('/');
  };

  const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-[12px] mb-2">
      <CustomCheckbox checked={met} />
      <span className={met ? "text-green-700" : "text-gray-600"}>{text}</span>
    </div>
  );

  return (
    <div className="flex background">
      <div className="bg-black/20 flex min-w-full justify-center items-center min-h-screen">
        <Card className="bg-white pb-8 p-8 rounded-lg shadow-md w-[450px]">
        <div className='flex w-32 h-32 justify-center mx-auto items-center border-[5px] rounded-full mb-4 text-[#212B37] font-bold'>
                    {/* <img src={logo} alt="Logo" /> */}
                    <img src={logo} alt="Logo" className='w-28 h-20 rounded-full' />
                    </div >
          <h2 className="text-2xl flex justify-center font-bold mb-2 text-black">
            Reset Password
          </h2>
          <p className="flex justify-center mb-6 text-[#6E829F]">
            Choose a strong password
          </p>

          <form onSubmit={handleSubmit}>
            <CustomInput
              type="password"
              label="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              flexInputText="text-black flex"
              placeholder="Enter New Password"
              className="mb-5"
            />
            <CustomInput
              type="password"
              label="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              flexInputText="text-black flex"
              placeholder="Confirm New Password"
              className="mb-5"
            />
            
            <div className="bg-gray-50 py-2    grid gap-2 grid-cols-2 rounded-lg mb-4">
              <h3 className="font-medium mb-3 col-span-2 text-gray-700">Password Requirements:</h3>
              <RequirementItem met={requirements.eightChars} text="At least 8 characters" />
              <RequirementItem met={requirements.hasUpperCase} text="At least one uppercase letter" />
              <RequirementItem met={requirements.hasLowerCase} text="At least one lowercase letter" />
              <RequirementItem met={requirements.hasNumber} text="At least one number" />
              <RequirementItem met={requirements.hasSymbol} text="At least one symbol" />
              <RequirementItem met={requirements.passwordsMatch} text="Passwords match" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={!allRequirementsMet}
            >
              Reset Password
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;