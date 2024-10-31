import EmpyLogo from '../../assets/empy_logo.svg'
import UserImage from '../../assets/user_image.png'
import {
  PiChartPie,
  PiWallet,
  PiToolbox,
  PiStorefront,
  PiClipboardText,
  PiMoney,
  PiUserCircle,
  PiSun,
} from 'react-icons/pi'
import { SideBarIcon } from './SideBarIcon'

export function SideBar() {
  return (
    <aside className='w-20 bg-white shadow-side-bar flex flex-col pt-8 pb-6 gap-12'>
      <div className='flex justify-center items-center'>
        <img src={EmpyLogo} />
      </div>
      <nav className='flex-1 flex flex-col justify-between items-center'>
        <div className='flex flex-col gap-5'>
          <SideBarIcon icon={PiChartPie} />
          <SideBarIcon active icon={PiWallet} />
          <SideBarIcon icon={PiToolbox} />
          <SideBarIcon icon={PiStorefront} />
          <SideBarIcon icon={PiClipboardText} />
          <SideBarIcon icon={PiMoney} />
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <SideBarIcon icon={PiUserCircle} />
          <SideBarIcon icon={PiSun} />
          <div className='p-[8px] rounded-lg'>
            <img src={UserImage} />
          </div>
        </div>
      </nav>
    </aside>
  )
}
