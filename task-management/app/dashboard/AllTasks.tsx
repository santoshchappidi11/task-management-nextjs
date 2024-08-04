import { faArrowUpShortWide, faClock, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import TimeAgo from './TimeAgo'

import DndContext from '../DragAndDrop/DragAndDropContext'
// import DraggableItem from '../DragAndDrop/DraggableItem'
// import DroppableArea from '../DragAndDrop/DroppableArea'

// interface Item {
//   id: number;
//   content: string;
// }

// interface Column {
//     id: string;
//     items: Item[];
//   }
  
//   const initialColumns: Column[] = [
//     { id: 'column1', items: [{ id: 1, content: 'Item 1' }, { id: 2, content: 'Item 2' }] },
//     { id: 'column2', items: [{ id: 3, content: 'Item 3' }] },
//     { id: 'column3', items: [{ id: 4, content: 'Item 4' }] },
//     { id: 'column4', items: [{ id: 5, content: 'Item 5' }, { id: 6, content: 'Item 6' }] },
//   ];
  

interface Task {
    _id: string;
    title: string;
    description?: string;
    priority?: 'Low' | 'Medium' | 'Urgent';
    date: string;
    status: 'To do' | 'In progress' | 'Under review' | 'Finished';
  }
  
  interface AllTasksProps {
    handleOpenModal: (e:any) => void;
    editTask: (id: string) => void; 
    deleteTask: (id: string) => void
    allTasks: Task[];
  }
  

  const AllUserTasks: React.FC<AllTasksProps> = ({ handleOpenModal, allTasks, editTask, deleteTask }) => {

//   const [columns, setColumns] = useState<Column[]>(initialColumns);

//   const handleDrop = (item: { id: string | number }, targetColumnId: string) => {
//     // Find the source column and target column
//     const sourceColumnIndex = columns.findIndex(column => column.items.some(i => i.id === item.id));
//     const targetColumnIndex = columns.findIndex(column => column.id === targetColumnId);

//     if (sourceColumnIndex === -1 || targetColumnIndex === -1) return; // Invalid column index

//     // Check if the item is dropped into the same column
//     if (sourceColumnIndex === targetColumnIndex) return; // No need to update if it's the same column

//     // Find the item to move
//     const itemToMove = columns[sourceColumnIndex].items.find(i => i.id === item.id);
//     if (!itemToMove) return;

//     // Update source and target columns
//     const updatedSourceColumnItems = columns[sourceColumnIndex].items.filter(i => i.id !== item.id);
//     const updatedTargetColumnItems = [...columns[targetColumnIndex].items, itemToMove];

//     // Update columns state
//     const updatedColumns = columns.map((column, index) => {
//       if (index === sourceColumnIndex) {
//         return { ...column, items: updatedSourceColumnItems };
//       } else if (index === targetColumnIndex) {
//         return { ...column, items: updatedTargetColumnItems };
//       }
//       return column;
//     });

//     setColumns(updatedColumns);
//   };
    

    const [todoTasks, setTodoTasks] = useState<Task[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
    const [underReviewTasks, setUnderReviewTasks] = useState<Task[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (allTasks) {
          setTodoTasks(allTasks.filter((task: Task) => task.status === 'To do'));
          setInProgressTasks(allTasks.filter((task: Task) => task.status === 'In progress'));
          setUnderReviewTasks(allTasks.filter((task: Task) => task.status === 'Under review'));
          setFinishedTasks(allTasks.filter((task: Task) => task.status === 'Finished'));
        }
      }, [allTasks])


  return (
    
    <DndContext>
        <div className='w-full h-4/5 flex justify-between items-start py-5 px-5 bg-white'>

            {allTasks ? 
                   <>
                     <div className='w-72'>
                        <div className='flex items-center justify-between py-2'>
                            <h1>To do</h1>
                            <FontAwesomeIcon icon={faArrowUpShortWide} size='lg'/>
                        </div>

                        {todoTasks?.length > 0 ? todoTasks.map((task : any) => (
                            <>
                            <div className='px-2 border mt-2 mb-4 rounded-md py-2 bg-gray-100' key={task._id}>
                            <h1 className='text-lg font-medium'>{task.title}</h1>
                            {task.description && <p className='text-xs'>{task.description}</p>}
                            {task.priority && <p className={`mt-2 mb-1 text-xs text-white w-14 h-6 flex justify-center items-center rounded-md ${task.priority == 'Low' && 'bg-green-500' || task.priority == 'Medium' && 'bg-orange-500' || task.priority == 'Urgent' && 'bg-red-600'}`}>{task.priority}</p>}
                            <div className=' my-2'>
                                <FontAwesomeIcon icon={faClock} className='mr-2' />
                                <span className='text-xs font-semibold'>{new Date(task.date).toISOString().split('T')[0]}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                    <p className='text-xs my-2'><TimeAgo timestamp={task.date} /></p>
                                <div className='w-1/6 flex justify-between items-center'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => editTask(task._id)}/>
                                    <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => deleteTask(task._id)}/>
                                </div>
                            </div>
                        </div>
                            </>
                        )) : <div className='w-full h-52 flex justify-center items-center'><p>No tasks!</p></div> }

                        <div onClick={(e) => handleOpenModal(e)} className='flex justify-between items-center px-2 py-2 border  rounded-md cursor-pointer bg-black text-white' >
                            <p className='text-sm'>Add new</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <div className='w-72 '>
                        <div className='flex items-center justify-between py-2'>
                            <h1>In progress</h1>
                            <FontAwesomeIcon icon={faArrowUpShortWide} size='lg'/>
                        </div>

                        {inProgressTasks?.length > 0 ? inProgressTasks.map((task : any) => (
                            <>
                            <div className='px-2 border mt-2 mb-4 rounded-md py-2 bg-gray-100' key={task._id}>
                            <h1 className='text-lg font-medium'>{task.title}</h1>
                            {task.description && <p className='text-xs'>{task.description}</p>}
                            {task.priority && <p className={`mt-2 mb-1 text-xs text-white w-14 h-6 flex justify-center items-center rounded-md ${task.priority == 'Low' && 'bg-green-500' || task.priority == 'Medium' && 'bg-orange-500' || task.priority == 'Urgent' && 'bg-red-600'}`}>{task.priority}</p>}
                            <div className=' my-2'>
                                <FontAwesomeIcon icon={faClock} className='mr-2' />
                                <span className='text-xs font-semibold'>{new Date(task.date).toISOString().split('T')[0]}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                    <p className='text-xs my-2'><TimeAgo timestamp={task.date} /></p>
                                <div className='w-1/6 flex justify-between items-center'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => editTask(task._id)}/>
                                    <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => deleteTask(task._id)}/>
                                </div>
                            </div>
                        </div>
                            </>
                        )) : <div className='w-full h-52 flex justify-center items-center'><p>No tasks!</p></div>}

                        <div onClick={(e) => handleOpenModal(e)} className='flex justify-between items-center px-2 py-2 border  rounded-md cursor-pointer bg-black text-white' >
                            <p className='text-sm '>Add new</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <div className='w-72 '>
                        <div className='flex items-center justify-between py-2'>
                            <h1>Under review</h1>
                            <FontAwesomeIcon icon={faArrowUpShortWide} size='lg'/>
                        </div>

                        {underReviewTasks?.length > 0 ? underReviewTasks.map((task : any) => (
                            <>
                            <div className='px-2 border mt-2 mb-4 rounded-md py-2 bg-gray-100' key={task._id}>
                            <h1 className='text-lg font-medium'>{task.title}</h1>
                            {task.description && <p className='text-xs'>{task.description}</p>}
                            {task.priority && <p className={`mt-2 mb-1 text-xs text-white w-14 h-6 flex justify-center items-center rounded-md ${task.priority == 'Low' && 'bg-green-500' || task.priority == 'Medium' && 'bg-orange-500' || task.priority == 'Urgent' && 'bg-red-600'}`}>{task.priority}</p>}
                            <div className=' my-2'>
                                <FontAwesomeIcon icon={faClock} className='mr-2' />
                                <span className='text-xs font-semibold'>{new Date(task.date).toISOString().split('T')[0]}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                    <p className='text-xs my-2'><TimeAgo timestamp={task.date} /></p>
                                <div className='w-1/6 flex justify-between items-center'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => editTask(task._id)}/>
                                    <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => deleteTask(task._id)}/>
                                </div>
                            </div>
                        </div>
                            </>
                        )) : <div className='w-full h-52 flex justify-center items-center'><p>No tasks!</p></div>}

                        <div onClick={(e) => handleOpenModal(e)} className='flex justify-between items-center px-2 py-2 border  rounded-md cursor-pointer bg-black text-white' >
                            <p className='text-sm '>Add new</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <div className='w-72 '>
                        <div className='flex items-center justify-between py-2'>
                            <h1>Finished</h1>
                            <FontAwesomeIcon icon={faArrowUpShortWide} size='lg'/>
                        </div>

                        {finishedTasks?.length > 0 ?  finishedTasks.map((task : any) => (
                            <>
                            <div className='px-2 border mt-2 mb-4 rounded-md py-2 bg-gray-100' key={task._id}>
                            <h1 className='text-lg font-medium'>{task.title}</h1>
                            {task.description && <p className='text-xs'>{task.description}</p>}
                            {task.priority && <p className={`mt-2 mb-1 text-xs text-white w-14 h-6 flex justify-center items-center rounded-md ${task.priority == 'Low' && 'bg-green-500' || task.priority == 'Medium' && 'bg-orange-500' || task.priority == 'Urgent' && 'bg-red-600'}`}>{task.priority}</p>}
                            <div className=' my-2'>
                                <FontAwesomeIcon icon={faClock} className='mr-2' />
                                <span className='text-xs font-semibold'>{new Date(task.date).toISOString().split('T')[0]}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                    <p className='text-xs my-2'><TimeAgo timestamp={task.date} /></p>
                                <div className='w-1/6 flex justify-between items-center'>
                                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => editTask(task._id)}/>
                                    <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => deleteTask(task._id)}/>
                                </div>
                            </div>
                        </div>
                            </>
                        )) : <div className='w-full h-52 flex justify-center items-center'><p>No tasks!</p></div>}

                        <div onClick={(e) => handleOpenModal(e)} className='flex justify-between items-center px-2 py-2 border  rounded-md cursor-pointer bg-black text-white' >
                            <p className='text-sm '>Add new</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                   </>
                : 

                <>
                    <div className='h-full w-full flex justify-center items-center'>
                        <p className='text-9x text-black'>No tasks!</p>
                    </div>
                </> }
            
            {/* <div style={{ display: 'flex', gap: '10px' }}>
                {columns.map((column) => (
                <DroppableArea key={column.id} onDrop={(item) => handleDrop(item, column.id)}>
                    <h2>Column {column.id}</h2>
                    {column.items.map((item) => (
                    <DraggableItem key={item.id} id={item.id}>
                        <div style={{ padding: '8px', border: '1px solid black', marginBottom: '5px' }}>
                        {item.content}
                        </div>
                    </DraggableItem>
                    ))}
                </DroppableArea>
                ))}
          </div> */}
        </div>
    </DndContext>

    
 
    )
}

export default AllUserTasks