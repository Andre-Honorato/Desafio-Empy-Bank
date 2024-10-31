import { ElementType } from 'react'

interface CardActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  color?: string
  icon: ElementType
  iconPosition?: 'left' | 'right'
}

export function CardAction({
  text,
  color = '#00BDFF',
  icon: Icon,
  iconPosition = 'left',
  ...rest
}: CardActionProps) {
  return (
    <button className='flex justify-center text-xs items-center text-white px-4 py-1 rounded-[18px]' style={{ backgroundColor: color }} {...rest}>
      {iconPosition === 'left' && (
        <Icon
          className='mr-1'
          size='24'
        />
      )}
      {text}
      {iconPosition === 'right' && (
        <Icon
          className='ml-1'
          size='24'
        />
      )}
    </button>
  )
}
