import { faCalendar, faCirclePlus, faFilter, faMagnifyingGlass, faQuestion, faShareNodes, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useMyContext } from '../context/MyContext';

interface TopPanelProps {
    handleOpenModal: (e:any) => void
  }



  const TopPanel: React.FC<TopPanelProps> = ({ handleOpenModal }) => {

    const {currentUser} = useMyContext()

    const getGreeting = (): string => {
        const date = new Date();
        const hours = date.getHours();
      
        if (hours < 12) {
          return 'Good morning';
        } else if (hours < 18) {
          return 'Good afternoon';
        } else {
          return 'Good evening';
        }
      };

    const greetingMessage = getGreeting();

  return (
    <div className='w-full h-1/5'>
    <div className=' flex justify-between items-center px-5 h-3/5'>
        <h1 className='text-3xl font-semibold'>{greetingMessage}, {currentUser?.name?.toUpperCase()}!</h1>
        <p>Help & feedback <span> <FontAwesomeIcon icon={faQuestion} /> </span></p>
    </div>

    <div className='flex justify-between items-center px-5 h-2/5'>
        <div className='py-1 px-2 rounded-lg bg-white border'>
            <input type='text' name='search' placeholder='search' className='mr-1 outline-none' />
            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
        </div>

        <div className='w-3/5 h-full flex justify-around items-center'>
        <div className='flex justify-around items-center'>
                <p>calendar view</p>
                <FontAwesomeIcon icon={faCalendar} size='lg' className='ml-2' />
        </div>
        <div className='flex justify-around items-center'>
                <p>Automation</p>
                <FontAwesomeIcon icon={faWandMagicSparkles} size='lg' className='ml-2' />
        </div>
        <div className='flex justify-around items-center'>
                <p>Filter</p>
                <FontAwesomeIcon icon={faFilter} size='lg'  className='ml-2'/>
        </div>
        <div className='flex justify-around items-center'>
                <p>share</p>
                <FontAwesomeIcon icon={faShareNodes} size='lg' className='ml-2' />
        </div>
            <button onClick={(e) => handleOpenModal(e)} className='py-2 px-2 text-sm rounded-md flex items-center justify-center cursor-pointer  bg-violet-600 text-white shadow'>
                Create new task
                <FontAwesomeIcon icon={faCirclePlus} size='lg' className='ml-2' />
            </button>
        </div>
    </div>
</div>
  )
}

export default TopPanel