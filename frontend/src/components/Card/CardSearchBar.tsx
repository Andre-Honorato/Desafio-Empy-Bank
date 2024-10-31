import { PiMagnifyingGlass } from 'react-icons/pi'

interface CardSearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function CardSearchBar({ onChange }: CardSearchBarProps) {
  return (
    <div className='relative mt-5'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <PiMagnifyingGlass
          size='20'
          color='#121929'
        />
      </div>
      <input
        onChange={onChange}
        className='block w-full h-full ps-10 py-2 border border-border-color outline-none px-2 rounded-xl focus:ring-2 ring-offset-2 ring-[#00BDFF] transition-all'
        type='text'
        placeholder='Buscar'
      />
    </div>
  )
}
