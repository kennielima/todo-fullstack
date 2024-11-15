"use client"
import React from 'react'
import { deleteTask } from './deletequery';
import { useRouter } from 'next/navigation';

const DeleteTask = ({id}: {id: number}) => {
    const router = useRouter();
    const deleteHandler = () => {
        deleteTask(id);
        router.push('/')
    }
    // handling delete function in server-side page
    // const deleteHandler = async (id: number) => {
    //     try {
    //         await axios.delete(`/api/deletetask/${id}`);
    //         console.log('try to delete')
    //         router.push('/')
    //     } catch (error) {
    //         console.error('Error deleting task:', error);
    //     }
    // };

  return (
        <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={deleteHandler}>Delete</button>
    )
}

export default DeleteTask