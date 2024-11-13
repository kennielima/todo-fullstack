import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Task } from '@/app/lib/types';
import DeleteTask from './components/DeleteTask';
import { formatDateTime } from './lib/utils';

export const deleteTask = async (id: number) => {
  try {
    await axios.delete(`${process.env.API_URL}/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};


const TaskList = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/api/tasks`, {
    headers: {
      'Content-type': "application/json"
    }
  });
  const tasks = response.data;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Task List</h2>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Manage your tasks below:</span>
        <Link href="/add">
          <p className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200">
            Add Task
          </p>
        </Link>
      </div>

      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task: Task) => (
            <li key={task.id} className="p-4 bg-gray-100 rounded-md shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <strong className="text-lg text-gray-900">{task.title}</strong>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {task.status}
                </span>
              </div>
              {task.description && <p className="text-gray-700 text-sm mb-1">{task.description}</p>}
              {task.dueDate && <p className="text-gray-500 text-xs">Due: {formatDateTime(task.dueDate)}</p>}
              <div className="flex justify-between items-center mt-3">
                <Link href={`/edit/${task.id}`}>
                  <p className="text-blue-500 hover:underline">Edit</p>
                </Link>
                <DeleteTask id={task.id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No tasks yet</p>
      )}
    </div>
  );
};

export default TaskList;
