import React from 'react'

interface AdvancedLoadingProps {
  size?: 'sm' | 'md' | 'lg'
}

const AdvancedLoading: React.FC<AdvancedLoadingProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`relative mx-auto  ${sizeClasses[size]}`}>
      {/* Pulsating circle */}
      <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-400 opacity-75 animate-ping"></div>
      
      {/* Static circle */}
      <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-400 opacity-90"></div>
      
      {/* Rotating ring */}
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-300 dark:border-t-blue-200 animate-spin"></div>
      
      {/* Inner circle */}
      <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-800"></div>
    </div>
  )
}

export default AdvancedLoading

