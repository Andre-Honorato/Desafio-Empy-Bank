import { useState } from 'react'
import { PiCheckSquare } from 'react-icons/pi'
import { Client } from '../../types/types'

interface CardListItem {
  item: Client,
  onCheck: (item: Client, checked: boolean) => void
}

export function CardListemItem({ item, onCheck }: CardListItem) {
  const [checked, setChecked] = useState(false)

  const handleCheck = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onCheck(item, newChecked)
  }

  return (
    <div className={`flex items-center gap-3 mt-4 text-primary text-sm bg-layout-body px-4 py-3 rounded-[18px] ${checked && 'border border-[#00BDFF]'}`}>
      {checked ? (
        <PiCheckSquare
          color='#00BDFF'
          size='18'
          onClick={handleCheck}
        />
      ) : (
        <input
          type='checkbox'
          className='ml-1 w-[14px] h-[14px]'
          onClick={handleCheck}
        />
      )}
      <span className='w-1/12'>{item.codigo}</span>
      <span className='flex-1'>{item.nome}</span>
      <span className='w-1/12'>{item.rede}</span>
    </div>
  )
}
