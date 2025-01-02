/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputType = 'text' | 'date' | 'checkbox' | 'radio' | 'select' | 'switch' | 'textarea' | 'combobox' | 'password' | 'email' | 'number';

export interface Option {
  label: string;
  value: string;
}

export interface CustomInputProps {
  type: InputType;
  label: string;
  name: string;
  options?: Option[];
  value: any;
  onChange: (name: string, value: any) => void;
  flexInput?:string;
  flexInputText?:string;
  placeholder?:string;
  className?:string;
}

export interface FormData {
    name: string;
    email: string;
    password: string;
    birthdate: string;
    age: number;
    subscribe: boolean;
    gender: string;
    role: string;
    bio: string;
    skills: string;
    notifications: boolean;
  }