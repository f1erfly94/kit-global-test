
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
                                                children,
                                                variant = 'default',
                                                size = 'sm',
                                                className = ''
                                            }) => {
    const variantClasses = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-purple-100 text-purple-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800'
    };

    const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm'
    };

    return (
        <span className={`
      inline-flex items-center rounded-full font-medium
      ${variantClasses[variant]} ${sizeClasses[size]} ${className}
    `}>
      {children}
    </span>
    );
};