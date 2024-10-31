interface CardTitleProps {
  title: string
  quantity: number
}

export function CardTitle({ title, quantity }: CardTitleProps) {
  return (
    <div className='flex items-center'>
      <h2 className='font-bold text-primary'>{title}</h2>
      <span className='ml-4 text-side-bar-icon-hover border border-border-color px-3 rounded-[18px]'>
        {quantity}
      </span>
    </div>
  )
}
