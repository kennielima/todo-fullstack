import axios from "axios";

export const deleteTask = async (id: number) => {
    try {
      await axios.delete(`/api/deletetask/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };