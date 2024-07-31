import { faAnglesRight, faBell, faChartLine, faCirclePlus, faCircleUser, faGear, faHouse, faSquarePollVertical, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useMyContext } from '../context/MyContext';

interface LeftPanelProps {
    handleLogout: () => void;
    handleOpenModal: (e:any) => void
  }


const LeftPanel: React.FC<LeftPanelProps> = ({ handleLogout, handleOpenModal }) => {

    const {currentUser} = useMyContext()

  return (
    <div className='w-1/6 h-full  pl-4 pt-2 bg-white border'>
                <div className='h-10 w-full flex items-center justify-start' >
                    <FontAwesomeIcon icon={faCircleUser} size='2x' className='pr-1' />
                    <h2>{currentUser?.name}</h2>
                </div>
                <div className='h-10 w-full-500 flex items-center justify-start my-1'>
                    <FontAwesomeIcon icon={faBell} size='1x' className='ml-0' />
                    <FontAwesomeIcon icon={faAnglesRight} size='1x' className='ml-8' />
                    <button  onClick={handleLogout} className='ml-20 bg-gray-200 px-2 py-1 rounded-md cursor-pointer'>Logout</button>
                </div>
                <div>
                    <div className='mb-1 mr-3 py-2 px-2 flex items-center justify-start hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon  icon={faHouse} size='lg' className='mr-2'/> 
                        Home
                    </div>
                    <div className='mb-1 mr-3 py-2 px-2 flex items-center justify-start hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon icon={faSquarePollVertical} size='lg' className='mr-2' />
                        Boards
                    </div>
                    <div className='mb-1 mr-3 py-2 px-2 flex items-center justify-start  hover:bg-gray-200 rounded-md cursor-pointer'>
                    <FontAwesomeIcon icon={faGear} size='lg' className='mr-2' />
                        Settings
                    </div>
                    <div className='mb-1 mr-3 py-2 px-2 flex items-center justify-start  hover:bg-gray-200 rounded-md cursor-pointer'>
                    <FontAwesomeIcon icon={faUsers} size='lg' className='mr-2'/>
                        Teams
                    </div>
                    <div className='mb-1 mr-3 py-2 px-2 flex items-center justify-start  hover:bg-gray-200 rounded-md cursor-pointer'>
                    <FontAwesomeIcon icon={faChartLine} size='lg' className='mr-2'/>
                        Analytics
                    </div>
                </div>
                <div>
                    <button onClick={(e) => handleOpenModal(e)} className='w-11/12 h-11 rounded-md flex items-center justify-center cursor-pointer bg-violet-600 text-white shadow my-2'>
                        Create new task
                        <FontAwesomeIcon icon={faCirclePlus} size='lg' className='mx-2'/>
                    </button>
                </div>
            </div>
  )
}

export default LeftPanel