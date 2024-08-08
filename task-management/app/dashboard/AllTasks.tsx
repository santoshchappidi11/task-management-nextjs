import { faArrowUpShortWide, faClock, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import TimeAgo from './TimeAgo'

import DndContext from '../DragAndDrop/DragAndDropContext'
import DraggableItem from '../DragAndDrop/DraggableItem'
import DroppableArea from '../DragAndDrop/DroppableArea'
import api from '@/config'
import toast from 'react-hot-toast'

interface Item {
_id: string;
userId:string;
title: string;
description?: string;
priority?: 'Low' | 'Medium' | 'Urgent';
date: string;
status: 'To do' | 'In progress' | 'Under review' | 'Finished';
}

interface Column {
    id: string;
    title:string;
    items: Item[];
  }
  
interface Task {
    _id: string;
    userId:string;
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

    const [todoTasks, setTodoTasks] = useState<Task[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
    const [underReviewTasks, setUnderReviewTasks] = useState<Task[]>([]);
    const [finishedTasks, setFinishedTasks] = useState<Task[]>([]);
    const [columns, setColumns] = useState<Column[]>();
    const [handleAllTasks, setHandleAllTasks] = useState<Task[]>([])


    useEffect(() => {
      if(allTasks){
        setHandleAllTasks(allTasks)
      }
    },[allTasks])
    
    useEffect(() => {
        if (handleAllTasks) {
          setTodoTasks(handleAllTasks.filter((task: Task) => task.status === 'To do'));
          setInProgressTasks(handleAllTasks.filter((task: Task) => task.status === 'In progress'));
          setUnderReviewTasks(handleAllTasks.filter((task: Task) => task.status === 'Under review'));
          setFinishedTasks(handleAllTasks.filter((task: Task) => task.status === 'Finished'));
        }

      }, [handleAllTasks])


      useEffect(() => {
        const initialColumns: Column[] = [
          { id: 'column1', title:'To do', items: todoTasks },
          { id: 'column2', title:'In progress', items: inProgressTasks },
          { id: 'column3', title:'Under review',   items: underReviewTasks },
          { id: 'column4', title:'Finished',  items: finishedTasks },
        ];
        setColumns(initialColumns);
      }, [todoTasks, inProgressTasks, underReviewTasks, finishedTasks]);


  const handleDrop = (item: { id: string | number }, targetColumnId: string, title:string, column:any) => {

    const handleUpdateTask = async() => {
      const token = localStorage.getItem("Token");

      if (token) {
          try {
              const parsedToken = JSON.parse(token);
              const response = await api.post("/update-task", {
              taskId:item.id,
              token:parsedToken,
              taskData:{status:title},
              });

              if (response.data.success) {
              setHandleAllTasks(response.data.tasks);
              toast.success(response.data.message);
              } else {
              toast.error(response.data.message);
              }
          } catch (error:any) {
              toast.error(error.response.data.message);
          }
      }
  }

  handleUpdateTask()

    if (!columns) return; // Ensure columns is defined

    // Find the source column and target column
    const sourceColumnIndex = columns.findIndex(column => column.items.some(i => i._id === item.id));
    const targetColumnIndex = columns.findIndex(column => column.id === targetColumnId);

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return; // Invalid column index

    // Check if the item is dropped into the same column
    if (sourceColumnIndex === targetColumnIndex) return; // No need to update if it's the same column

    // Find the item to move
    const itemToMove = columns[sourceColumnIndex].items.find((i:any) => i._id === item.id);
    if (!itemToMove) return;

    // Update source and target columns
    const updatedSourceColumnItems = columns[sourceColumnIndex].items.filter(i => i._id !== item.id);
    const updatedTargetColumnItems = [...columns[targetColumnIndex].items, itemToMove];

    // Update columns state
    const updatedColumns = columns?.map((column, index) => {
      if (index === sourceColumnIndex) {
        return { ...column, items: updatedSourceColumnItems };
      } else if (index === targetColumnIndex) {
        return { ...column, items: updatedTargetColumnItems };
      }
      return column;
    });

    setColumns(updatedColumns);
  };



  return (
    
    <DndContext>
        <div className='w-full h-4/5 flex justify-between items-start py-5 px-5 bg-white'>

          <div className='w-full h-4/5 flex justify-between items-start py-5 px-5 bg-white'>
                {columns?.map((column) => (

               <DroppableArea key={column.id} onDrop={(item) => handleDrop(item, column.id, column.title, column)}>
                     <div className='w-72 borde px-2 rounded-lg'>
                        <div className='flex items-center justify-between py-2'>
                            <h1>{column.title}</h1>
                            <FontAwesomeIcon icon={faArrowUpShortWide} size='lg'/>
                        </div>

                        <div className='overflow-y-auto max-h-96 min-h-auto '>
                            {column.items.length > 0 ?   column?.items?.map((item) => (
                                <DraggableItem key={item?._id} id={item?._id}>
                                    <>
                                        <div className='px-2 mt-2 mb-4 rounded-md py-2 bg-gray-100 cursor-grab' key={item?._id}>
                                        <h1 className='text-lg font-medium'>{item?.title}</h1>
                                        {item?.description && <p className='text-xs'>{item?.description}</p>}
                                        {item?.priority && <p className={`mt-2 mb-1 text-xs text-white w-14 h-6 flex justify-center items-center rounded-md ${item?.priority == 'Low' && 'bg-green-500' || item?.priority == 'Medium' && 'bg-orange-500' || item?.priority == 'Urgent' && 'bg-red-600'}`}>{item?.priority}</p>}
                                        <div className=' my-2'>
                                            <FontAwesomeIcon icon={faClock} className='mr-2' />
                                            <span className='text-xs font-semibold'>{new Date(item?.date).toISOString().split('T')[0]}</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                                <p className='text-xs my-2'><TimeAgo timestamp={item?.date} /></p>
                                            <div className='w-1/6 flex justify-between items-center'>
                                                <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' onClick={() => editTask(item?._id)}/>
                                                <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer' onClick={() => deleteTask(item?._id)}/>
                                            </div>
                                        </div>
                                        </div>
                                    </>
                                </DraggableItem>
                            )) :  
                            <>
                            <div className='h-40 w-full flex justify-center items-center'>
                                <p className='text-9x text-black'>No tasks!</p>
                            </div>
                            </>}
                        </div>

                        <div onClick={(e) => handleOpenModal(e)} className='flex justify-between items-center px-2 py-2 border  rounded-md cursor-pointer bg-black text-white' >
                            <p className='text-sm '>Add new</p>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                     </div>
               </DroppableArea>
                ))}
         </div>

        </div>
    </DndContext>

    
 
    )
}

export default AllUserTasks