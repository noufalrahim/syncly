import { BASE_URL } from '@/constants';
import axios from 'axios';

export const getTasks = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects?id=${id}`);
    const resp = response.data;
    const tasks = resp[0].tasks;
    const taskData = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      taskData.push(task);
    }
    return taskData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
