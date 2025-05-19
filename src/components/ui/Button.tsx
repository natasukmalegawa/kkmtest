'use client'

import { MouseEventHandler, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'transparent'

type ButtonProps = {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300"
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 rounded-full",
    outline: "border border-white text-white hover:bg-white hover:text-black rounded-full",
    transparent: "bg-transparent text-blue-400 hover:underline",
  }
  
  const sizeClasses = {
    sm: "text-sm px-4 py-1.5",
    md: "text-base px-6 py-2",
    lg: "text-base px-8 py-3",
  }
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}
