"use client"
import React, { useState } from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation";

const AddTask: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       await axios.post(`/api/addtask`, {
        title,
        description,
        status,
        dueDate,
      body: JSON.stringify({ title, description, status, dueDate })
    });

      router.push('/'); 
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-gray-700 mb-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 mb-1">Description:</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task description"
              />
            </div>
  
            <div>
              <label className="block text-gray-700 mb-1">Status:</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
  
            <div>
              <label className="block text-gray-700 mb-1">Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
  );
};

export default AddTask;
