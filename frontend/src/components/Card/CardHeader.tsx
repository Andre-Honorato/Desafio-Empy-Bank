import { ReactNode } from 'react'

interface CardHeaderProps {
  children: ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className='flex justify-between items-center'>
      {children}
    </div>
  )
}
