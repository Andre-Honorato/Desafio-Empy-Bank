import { ReactNode } from 'react'

interface CardActionsProps {
  children: ReactNode
}

export function CardActions({ children }: CardActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      {children}
    </div>
  )
}
