import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            {
              'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'primary',
              'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
              'border-2 border-gray-300 text-gray-700 hover:border-gray-400': variant === 'outline',
              'text-gray-600 hover:text-gray-900 hover:bg-gray-100': variant === 'ghost',
              'px-3 py-1.5 text-sm': size === 'sm',
              'px-4 py-2 text-base': size === 'md',
              'px-6 py-3 text-lg': size === 'lg',
            }
          ),
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

export { Button }