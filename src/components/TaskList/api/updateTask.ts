import { BASE_URL } from '@/constants';
import axios from 'axios';

export const updateTask = async (data: any, projectId: number, taskId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/projects?id=${projectId}`);
    const resp = response.data;
    const tasksData = resp[0].tasks;
    const taskIndex = tasksData.findIndex((task: any) => task.id === taskId);

    if (taskIndex === -1) {
      return [];
    }
    const newTasksData = tasksData.map((task: any) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...data,
          columnKey: data.status,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });

    console.log(newTasksData);

    resp[0].tasks = newTasksData;
    console.log(resp[0]);
    const patchResponse = await axios.patch(`${BASE_URL}/projects/${projectId}`, resp[0]);
    console.log(patchResponse);
    return patchResponse;
  } catch (error) {
    console.error(error);
    return [];
  }
};
