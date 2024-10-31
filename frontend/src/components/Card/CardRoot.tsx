import { ReactNode } from 'react'

interface CardRootProps {
  children: ReactNode
}

export function CardRoot({ children }: CardRootProps) {
  return (
    <div className='md:w-1/2 w-full max-h-custom overflow-y-auto bg-white h-full rounded-[18px] p-6'>
      {children}
    </div>
  )
}
