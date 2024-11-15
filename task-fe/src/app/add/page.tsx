import React from 'react';
import axios from 'axios'
import { redirect } from 'next/navigation';

const AddTask: React.FC = () => {
  const handleSubmit = async (formData: FormData) => {
    'use server'
    const title = formData.get('title');
    const description = formData.get('description');
    const status = formData.get('status');
    const dueDate = formData.get('dueDate');
    try {
      await axios.post(`${process.env.BASE_URL}/api/addtask`, {
       title,
       description,
       status,
       dueDate
      });
   } catch (error) {
     console.error('Error adding task:', error);
     throw new Error('failed to add task')
   }
   redirect('/')
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Task</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description:</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Status:</label>
            <select
              id="status"
              name="status"
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
              // value={dueDate}
              id="dueDate"
              name="dueDate"
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
