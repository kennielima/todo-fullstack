// // src/TaskManager.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:4000/tasks';

// function TaskManager() {
//   const [tasks, setTasks] = useState([]);
//   const [currentTask, setCurrentTask] = useState({ title: '', status: 'pending', dueDate: '' });
//   const [isEditing, setIsEditing] = useState(false);

//   // Fetch all tasks
//   useEffect(() => {
//     axios.get(API_URL).then(response => setTasks(response.data)).catch(console.error);
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
//   };

//   // Create a new task
//   const createTask = () => {
//     axios.post(API_URL, currentTask)
//       .then(response => setTasks([...tasks, response.data]))
//       .catch(console.error);
//     setCurrentTask({ title: '', status: 'pending', dueDate: '' });
//   };

//   // Update an existing task
//   const updateTask = (id) => {
//     axios.put(`${API_URL}/${id}`, currentTask)
//       .then(response => {
//         const updatedTasks = tasks.map(t => (t.id === id ? response.data : t));
//         setTasks(updatedTasks);
//         setIsEditing(false);
//       })
//       .catch(console.error);
//   };

//   // Delete a task
//   const deleteTask = (id) => {
//     axios.delete(`${API_URL}/${id}`)
//       .then(() => setTasks(tasks.filter(t => t.id !== id)))
//       .catch(console.error);
//   };

//   // Populate the form with task data for editing
//   const editTask = (task) => {
//     setCurrentTask(task);
//     setIsEditing(true);
//   };

//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <form onSubmit={(e) => { e.preventDefault(); isEditing ? updateTask(currentTask.id) : createTask(); }}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={currentTask.title}
//           onChange={handleChange}
//           required
//         />
//         <select name="status" value={currentTask.status} onChange={handleChange}>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//         <input
//           type="date"
//           name="dueDate"
//           value={currentTask.dueDate}
//           onChange={handleChange}
//         />
//         <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
//       </form>

//       <ul>
//         {tasks.map(task => (
//           <li key={task.id}>
//             <h3>{task.title}</h3>
//             <p>Status: {task.status}</p>
//             <p>Due Date: {task.dueDate}</p>
//             <button onClick={() => editTask(task)}>Edit</button>
//             <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TaskManager;
