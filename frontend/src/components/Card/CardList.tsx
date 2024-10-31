import { CardListemItem } from './CardListItem'
import { Client } from '../../types/types'
import { useState, useEffect } from 'react'

interface CardListProps {
  list: Client[],
  onSelectedItemsChange: (items: Client[]) => void
}

export function CardList({ list, onSelectedItemsChange }: CardListProps) {
  const [selectedItems, setSelectedItems] = useState<Client[]>([])

  const handleCheck = (item: Client, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, item])
    } else {
      setSelectedItems((prev) => prev.filter(i => i.id !== item.id))
    }
  }

  useEffect(() => {
    onSelectedItemsChange(selectedItems)
  }, [selectedItems, onSelectedItemsChange])

  return (
    <>
      <div className='flex ml-[3px] items-center px-4 gap-3 mt-4 text-side-bar-icon text-sm'>
        <div
          className='w-[14px] h-[14px]'
        />
        <span className='w-1/12'>Código</span>
        <span className='flex-1'>Parceiro</span>
        <span className='w-1/12'>Rede</span>
      </div>
      <div className='flex flex-col'>
        {list.map((item) => (
          <CardListemItem key={item.id} item={item} onCheck={handleCheck} />
        ))}
      </div>
    </>
  )
}
