import { BASE_URL } from '@/constants';
import axios from 'axios';

export const deleteTask = async (projectId: number, taskId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects?id=${projectId}`);
    const resp = response.data;
    const tasksData = resp[0].tasks;
    const taskIndex = tasksData.findIndex((task: any) => task.id === taskId);
    if (taskIndex === -1) {
      return [];
    }
    const filteredTasks = tasksData.filter((task: any) => task.id !== taskId);
    resp[0].tasks = filteredTasks;
    console.log(resp[0]);
    const deleteResponse = await axios.patch(`${BASE_URL}/projects/${projectId}`, resp[0]);
    return deleteResponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};
