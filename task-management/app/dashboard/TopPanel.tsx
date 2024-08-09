import { faCalendar, faCirclePlus, faFilter, faMagnifyingGlass, faQuestion, faShareNodes, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMyContext } from '../context/MyContext';

interface TopPanelProps {
    handleOpenModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TopPanel: React.FC<TopPanelProps> = ({ handleOpenModal }) => {
    const { currentUser } = useMyContext();

    const getGreeting = (): string => {
        const hours = new Date().getHours();
        if (hours < 12) return 'Good morning';
        if (hours < 18) return 'Good afternoon';
        return 'Good evening';
    };

    const greetingMessage = getGreeting();

    const actionItems = [
        { label: 'calendar view', icon: faCalendar },
        { label: 'Automation', icon: faWandMagicSparkles },
        { label: 'Filter', icon: faFilter },
        { label: 'share', icon: faShareNodes },
    ];

    const formatName = (name: string | undefined): string => {
      if (!name) return '';
    
      // Split the name into parts based on spaces
      const nameParts = name.split(' ');
    
      // Capitalize the first letter of each part
      const capitalizedParts = nameParts.map(part => 
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      );
    
      // Join the parts back together
      return capitalizedParts.join(' ');
    };

    return (
        <div className='w-full h-1/5'>
            <div className='flex justify-between items-center px-5 h-3/5'>
                <h1 className='text-3xl font-semibold'>
                    {greetingMessage}, <span className='text-violet-700'>{formatName(currentUser?.name)}</span>!
                </h1>
                <p>
                    Help & feedback <FontAwesomeIcon icon={faQuestion} />
                </p>
            </div>

            <div className='flex justify-between items-center px-5 h-2/5'>
                <div className='py-1 px-2 rounded-lg bg-white border flex items-center'>
                    <input type='text' name='search' placeholder='Search' className='mr-1 outline-none' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
                </div>

                <div className='w-3/5 h-full flex justify-around items-center'>
                    {actionItems.map((item) => (
                        <div key={item.label} className='flex items-center'>
                            <p>{item.label}</p>
                            <FontAwesomeIcon icon={item.icon} size='lg' className='ml-2' />
                        </div>
                    ))}
                    <button onClick={handleOpenModal} className='py-2 px-2 text-sm rounded-md flex items-center justify-center bg-violet-600 text-white shadow'>
                        Create new task
                        <FontAwesomeIcon icon={faCirclePlus} size='lg' className='ml-2' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopPanel;
