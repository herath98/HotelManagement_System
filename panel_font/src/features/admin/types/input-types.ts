/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
    label: string;
    value: string;
  }
  
  export interface CustomInputProps {
    type: 'text' | 'password' | 'email' | 'number' | 'date' | 'checkbox' | 'radio' | 'select' | 'switch' | 'textarea';
    label: string;
    name: string;
    options?: Option[];
    value: any;
    onChange: (name: string, value: any) => void;
  }
  
  export interface ProfileFormData {
    userName: string;
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    github: string;
    twitter: string;
    linkedin: string;
    portfolio: string;
    biographicalInfo: string;
    skills: string[];
  }
  
  