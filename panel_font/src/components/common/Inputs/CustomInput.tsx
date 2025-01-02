import React, { useState } from 'react';
import { CustomInputProps } from '../../../types/input-types';
import { Checkbox } from "@/components/common/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/common/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/common/ui/select";
import { Switch } from "@/components/common/ui/switch";
import { Textarea } from '../ui/textarea';
import { Label } from "@/components/common/ui/label";
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

export const CustomInput: React.FC<CustomInputProps> = ({ type, label, name, options, value, onChange, flexInput, flexInputText, placeholder, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  switch (type) {
    case 'text':
    case 'password':
    case 'email':
    case 'number':
      return (
        <div className={`${flexInput ? flexInput : 'space-y-2'}`}>
          <Label className={`${flexInputText ? flexInputText : ''}`} htmlFor={name}>{label}</Label>
          <div className="relative">
            <Input
              type={type === 'password' && !showPassword ? 'password' : 'text'}
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              placeholder={placeholder}
              className={className}
            />
            {type === 'password' && (
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
              </button>
            )}
          </div>
        </div>
      );
    case 'date':
      return (
        <div className={`${flexInput ? flexInput : 'space-y-2'}`}>
          <Label className={`${flexInputText ? flexInputText : ''}`} htmlFor={name}>{label}</Label>
          <Input
            type="date"
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            placeholder={placeholder}
            className={className}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={name}
            checked={value}
            onCheckedChange={(checked) => onChange(name, checked)}
          />
          <Label htmlFor={name}>{label}</Label>
        </div>
      );
    case 'radio':
      return (
        <div className="space-y-2">
          <Label>{label}</Label>
          <RadioGroup onValueChange={(value) => onChange(name, value)} value={value}>
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    case 'select':
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Select onValueChange={(value) => onChange(name, value)} value={value}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    case 'switch':
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={name}
            checked={value}
            onCheckedChange={(checked) => onChange(name, checked)}
          />
          <Label htmlFor={name}>{label}</Label>
        </div>
      );
    case 'textarea':
      return (
        <div className={`${flexInput ? flexInput : 'space-y-2'}`}>
          <Label className={`${flexInputText ? flexInputText : ''}`} htmlFor={name}>{label}</Label>
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
          />
        </div>
      );
    default:
      return null;
  }
};
