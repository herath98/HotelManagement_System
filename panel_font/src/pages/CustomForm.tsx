/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { InputType, Option, FormData } from '../types/input-types';
import { Button } from '@/components/common/ui/button';
import { CustomInput } from '@/components/common/Inputs/CustomInput';

const initialFormData: FormData = {
  name: '',
  email: '',
  password: '',
  birthdate: '',
  age: 0,
  subscribe: false,
  gender: '',
  role: '',
  bio: '',
  skills: '',
  notifications: false,
};

const genderOptions: Option[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const roleOptions: Option[] = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Manager', value: 'manager' },
];



export const CustomForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const renderInput = (type: InputType, label: string, name: keyof FormData, options?: Option[]) => (
    <CustomInput
      key={name}
      type={type}
      label={label}
      name={name}
      options={options}
      value={formData[name]}
      onChange={handleInputChange}
    />
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      {renderInput('text', 'Name', 'name')}
      {renderInput('email', 'Email', 'email')}
      {renderInput('password', 'Password', 'password')}
      {renderInput('date', 'Birthdate', 'birthdate')}
      {renderInput('number', 'Age', 'age')}
      {renderInput('checkbox', 'Subscribe to newsletter', 'subscribe')}
      {renderInput('radio', 'Gender', 'gender', genderOptions)}
      {renderInput('select', 'Role', 'role', roleOptions)}
      {renderInput('textarea', 'Bio', 'bio')}
      {renderInput('switch', 'Enable notifications', 'notifications')}
      <Button type="submit">Submit</Button>
    </form>
  );
};