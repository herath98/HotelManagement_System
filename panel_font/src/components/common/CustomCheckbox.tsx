import React from 'react';
import { Check } from 'lucide-react';

const CustomCheckbox = ({ checked }: { checked: boolean }) => (
  <div className="relative flex items-center justify-center w-4 h-4">
    <div className={`
      w-4 h-4 rounded-md border
      ${checked 
        ? 'bg-green-500 border-green-500' 
        : 'bg-white border-gray-300'
      }
      transition-colors duration-200
    `}>
      {checked && (
        <Check 
          className="text-white" 
          size={14} 
          absoluteStrokeWidth={true}
        />
      )}
    </div>
  </div>
);

export default CustomCheckbox;