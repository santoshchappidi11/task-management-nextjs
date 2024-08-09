import { faAnglesRight, faBell, faChartLine, faCirclePlus, faCircleUser, faGear, faHouse, faSquarePollVertical, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useMyContext } from '../context/MyContext';

interface LeftPanelProps {
    handleLogout: () => void;
    handleOpenModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ handleLogout, handleOpenModal }) => {
    const { currentUser } = useMyContext();

    const menuItems = [
        { icon: faHouse, label: 'Home' },
        { icon: faSquarePollVertical, label: 'Boards' },
        { icon: faGear, label: 'Settings' },
        { icon: faUsers, label: 'Teams' },
        { icon: faChartLine, label: 'Analytics' },
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
        <div className='w-1/6 h-full pl-4 pt-2 bg-white border'>
            <div className='h-10 w-full flex items-center'>
                <FontAwesomeIcon icon={faCircleUser} size='2x' className='pr-1' />
                <h2>{formatName(currentUser?.name)}</h2>
            </div>
            <div className='h-10 w-full flex items-center my-1'>
                <FontAwesomeIcon icon={faBell} size='1x' />
                <FontAwesomeIcon icon={faAnglesRight} size='1x' className='ml-8' />
                <button onClick={handleLogout} className='ml-20 bg-gray-200 px-2 py-1 rounded-md cursor-pointer'>
                    Logout
                </button>
            </div>
            <div>
                {menuItems.map((item) => (
                    <div key={item.label} className='mb-1 mr-3 py-2 px-2 flex items-center hover:bg-gray-200 rounded-md cursor-pointer'>
                        <FontAwesomeIcon icon={item.icon} size='lg' className='mr-2' />
                        {item.label}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handleOpenModal} className='w-11/12 h-11 rounded-md flex items-center justify-center bg-violet-600 text-white shadow my-2'>
                    Create new task
                    <FontAwesomeIcon icon={faCirclePlus} size='lg' className='mx-2' />
                </button>
            </div>
        </div>
    );
};

export default LeftPanel;
