'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { faPencil, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import api from '@/config'
import { useMyContext } from '../context/MyContext'
import { useRouter } from 'next/navigation';
import LeftPanel from './LeftPanel'
import TopPanel from './TopPanel'
import AllUserTasks from './AllTasks'
import toast from 'react-hot-toast'



const Dashboard = () => {

    const router = useRouter()
    const { Logout} = useMyContext()


    const handleLogout = () => {
        Logout()
        router.push("/login")
    }

    interface currentUser {
        name:string;
        email:string;
        userId:string;
    }

    interface taskData  {
        _id:string;
        title:string;
        status:string;
        priority:string;
        deadline:string;
        description:string;
    }

 
    const [statusTitle, setStatusTitle] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [closeModal, setIsCloseModal] = useState(true)
    const [isEditTask, setIsEditTask] = useState(false)
    const [taskData, setTaskData] = useState<taskData>({
        _id:"",
        title:"",
        status: `${statusTitle ? statusTitle : ""}`,
        priority:"",
        deadline:"",
        description:"",
    })
    const [allTasks, setAllTasks] = useState([])

    // console.log(statusTitle, 'status title')


    const handleOpenModal = (e:any) => {
        const parentElement = e.currentTarget.closest('.w-72');
            if (parentElement) {
                //h1 element within the parent
                const h1Element = parentElement.querySelector('h1');
                if (h1Element) {
                setStatusTitle(h1Element.innerText)
                }
            }
        setIsModalOpen(true)
        setIsCloseModal(false)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setIsCloseModal(true)
        setIsEditTask(false)
        setTaskData({
            _id:"",
            title:"",
            status:"",
            priority:"",
            deadline:"",
            description:"",
        })
        setStatusTitle("")
    }

    const editTask = async(taskId:string) => {

        const token = localStorage.getItem("Token");
      
          if (token) {
            try {
            const parsedToken = JSON.parse(token);
              const response = await api.post("/get-edit-task", { token:parsedToken, taskId });
      
              if (response.data.success) {
                    setTaskData({
                        _id:"",
                        title:"",
                        status:"",
                        priority:"",
                        deadline:"",
                        description:"",
                    })
                    setIsEditTask(true)
                    setIsModalOpen(true)
                    setIsCloseModal(false)
                    setTaskData(response?.data?.task);
                    setStatusTitle("")
              } else {
                toast.error(response.data.message);
              }
            } catch (error:any) {
              toast.error(error.response.data.message);
            }
          }

    }


    const handleChangeValues = (e:any) => {
        setTaskData({...taskData, [e.target.name]:e.target.value})
    }
    
    
    const handleStatusValue = (e:any) => {
        setStatusTitle(e.target.value);
    }

    const handleAddTaskSubmit = async(e:FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem("Token");
        
        if(taskData?.title){
            const newTaskData = {
                ...taskData,
                status:`${statusTitle && statusTitle}`
            }

            const newData = statusTitle ? newTaskData : taskData 

            if(token){
                try {
                    const parsedToken = JSON.parse(token);
                    const response = await api.post('/add-task', {taskData:newData, token:parsedToken})
                    if(response?.data?.success){
                        setTaskData({
                            _id:"",
                            title:"",
                            status:"",
                            priority:"",
                            deadline:"",
                            description:"",
                        })
                        toast.success(response?.data?.message)
                        setAllTasks(response.data.tasks)
                        setStatusTitle("")
                    }else{
                        toast.error(response?.data?.message)
                    }
                } catch (error:any) {
                    toast.error(error.response.data.message)
                }
            }
           

        }else{
            toast.error("please fill the title and status fields!")
        }
    }


    const handleUpdateTask = async(e:FormEvent, taskId:string) => {
        e.preventDefault();

        const token = localStorage.getItem("Token");

        if (token) {
            try {
                const parsedToken = JSON.parse(token);
                const response = await api.post("/update-task", {
                taskId,
                token:parsedToken,
                taskData,
                });

                if (response.data.success) {
                    setIsModalOpen(false)
                    setIsCloseModal(true)
                    setIsEditTask(false)
                    setTaskData({
                        _id:"",
                        title:"",
                        status:"",
                        priority:"",
                        deadline:"",
                        description:"",
                    })
                setAllTasks(response.data.tasks);
                toast.success(response.data.message);
                setStatusTitle("")
                } else {
                toast.error(response.data.message);
                }
            } catch (error:any) {
                toast.error(error.response.data.message);
            }
        }
    }


    const deleteTask = async (taskId:string) => {
        const token = localStorage.getItem("Token");
    
        if (token) {
          try {
            const parsedToken = JSON.parse(token);
            const response = await api.post("/delete-task", { token:parsedToken, taskId });
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                setAllTasks(response.data.tasks)
            } else {
              toast.error(response.data.message);
            }
          } catch (error:any) {
            toast.error(error.response.data.message);
          }
        }
      };

    useEffect(() => {
        const getYourTasks = async () => {
          const token = localStorage.getItem("Token")
    
          if (token) {
            try {
                const parsedToken = JSON.parse(token);
              const response = await api.post("/get-your-tasks", {
                token:parsedToken
              });
              if (response.data.success) {
                setAllTasks(response?.data?.tasks);
              } else {
                toast.error(response.data.message);
              }
            } catch (error:any) {
              console.log(error.response.data.message);
            }
          }
        };
    
        getYourTasks();
      }, []);


  return (
    <div>
        <div className='h-screen w-full  flex items-center justify-left bg-gray-100 absolute'>
            <LeftPanel handleLogout={handleLogout} handleOpenModal={handleOpenModal} />

            <div className='w-10/12 h-full bg-gray-100'>
                <TopPanel handleOpenModal={handleOpenModal}/>
                <AllUserTasks allTasks={allTasks} editTask={editTask} deleteTask={deleteTask}  handleOpenModal={handleOpenModal}/>
            </div>
        </div>

       {isModalOpen && !closeModal &&  <div className='h-screen w-full absolute bg-black z-10 opacity-50'>
        </div>}
         {isModalOpen && !closeModal && <div className={`h-screen w-2/5 relative bg-white float-end border z-50`}>
            <div className='w-11/12 h-full float-left mx-4'>
                <div className='h-16'>
                    <FontAwesomeIcon icon={faXmark} size='2xl' onClick={() => handleCloseModal()} className='cursor-pointer mt-2 ml-5' />
                </div>
                <div className= 'h-auto w-4/5 my-5'>
                    <form  >
                        <div className='h-auto w-full flex justify-around items-center flex-col px-5'>
                            <div className='h-10 w-full flex justify-between items-center mb-5'>
                                <div className='w-auto flex'>
                                    <FontAwesomeIcon icon={faPencil} size='lg' className='mr-10' />
                                    <label>Title</label>
                                </div>
                                <input name='title' placeholder='Your title' type='text' onChange={handleChangeValues} value={taskData.title} className='h-full w-3/5 outline-none pl-2 rounded-md '/>
                            </div>
                            <div className='h-10 w-full flex justify-between items-center mb-5'>
                                <div  className='w-auto flex '>
                                    <FontAwesomeIcon icon={faSpinner} size='lg'  className='mr-10'/>
                                    <label>Status</label>
                                </div>
                                <select className='h-full w-3/5 outline-none pl-2 rounded-md' defaultValue={statusTitle} name='status' onChange={handleChangeValues} onClick={handleStatusValue} value={taskData.status} >
                                    {statusTitle && <option value={statusTitle}>{statusTitle}</option>}
                                    {!statusTitle && <option value="" disabled>Not selected</option>}
                                    {statusTitle != 'To do' && <option value="To do">To do</option>}
                                    {statusTitle != 'In progress'  && <option value="In progress">In progress</option>}
                                    {statusTitle != 'Under review' && <option value="Under review">Under review</option>}
                                    {statusTitle != 'Finished' && <option value="Finished">Finished</option>}
                                </select>
                            </div>
                            <div className='h-10 w-full flex justify-between items-center mb-5'>
                                <div  className='w-auto flex '>
                                    <FontAwesomeIcon icon={faCircleExclamation} size='lg' className='mr-10' />
                                    <label>Priority</label>
                                </div>
                                <select className='h-full w-3/5 outline-none pl-2 rounded-md' name='priority' onChange={handleChangeValues} value={taskData.priority}>
                                    <option value="" disabled>Not selected</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className='h-10 w-full flex justify-between items-center mb-5'>
                                <div  className='w-auto flex'>
                                    <FontAwesomeIcon icon={faCalendar} size='lg' className='mr-10'/>
                                    <label>Deadline</label>
                                </div>
                                <input type='date' name='deadline' placeholder='Select date'  onChange={handleChangeValues} value={taskData.deadline} className='h-full w-3/5 outline-none pl-2 rounded-md' />
                            </div>
                            <div className='h-10 w-full flex justify-between items-center mb-5'>
                               <div  className='w-auto flex' >
                                    <FontAwesomeIcon icon={faPen} size='lg' className='mr-10'/>
                                    <label>Description</label>
                               </div>
                                <input type='text' name='description' placeholder='Your Description' onChange={handleChangeValues} value={taskData.description} className='h-full w-3/5 outline-none pl-2 rounded-md' />
                            </div>
                            {!isEditTask && <button onClick={handleAddTaskSubmit} className='text-xl w-full h-12 rounded-md flex items-center justify-center cursor-pointer bg-violet-600 text-white shadow my-2'>
                                <FontAwesomeIcon icon={faPlus} size='sm' className='mx-2'/>
                                Add Task
                            </button>}
                            {isEditTask && <button onClick={(e) => handleUpdateTask(e, taskData._id)} className='text-xl w-full h-12 rounded-md flex items-center justify-center cursor-pointer bg-violet-600 text-white shadow my-2'>
                                <FontAwesomeIcon icon={faPenToSquare}  size='sm' className='mx-2'/>
                                Update Task
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>}
</div>
  )
}

export default Dashboard