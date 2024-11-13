"use client"
import React from 'react'
import { deleteTask } from '../page';
import { useRouter } from 'next/navigation';

const DeleteTask = ({id}: {id: number}) => {
    const router = useRouter();
    const deleteHandler = () => {
        deleteTask(id);
        router.push('/')
    }
  return (
        <button className='bg-red-600 text-white py-1 px-2 rounded-md' onClick={deleteHandler}>Delete</button>
    )
}

export default DeleteTask