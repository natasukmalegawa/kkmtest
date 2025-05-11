import Link from 'next/link'
import { ReactNode } from 'react'

type AppleButtonProps = {
  children: ReactNode
  href: string
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function AppleButton({ 
  children, 
  href, 
  className = '', 
  onClick,
  type = 'button',
  disabled = false
}: AppleButtonProps) {
  const buttonClasses = `
    inline-block px-5 py-3 bg-apple-blue text-white text-sm font-medium rounded-full 
    transition-all duration-300 
    hover:bg-blue-600 
    active:scale-95 
    focus:outline-none focus:ring-2 focus:ring-blue-300
    dark:focus:ring-blue-700
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
