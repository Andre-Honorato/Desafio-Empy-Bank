import { ElementType } from 'react'

interface SideBarIconProps {
  icon: ElementType
  active?: boolean
}

export function SideBarIcon({ icon: Icon, active }: SideBarIconProps) {
  return (
    <div
      className={`p-[8px] rounded-lg group cursor-pointer ${
        active ? 'bg-side-bar-icon-active' : 'hover:bg-side-bar-icon-active'
      }`}
    >
      <Icon className={`${active ? 'text-side-bar-icon-hover' : 'text-side-bar-icon'}`} size='24' />
    </div>
  )
}
