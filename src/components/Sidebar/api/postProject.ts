import { BASE_URL } from '@/constants';
import axios from 'axios';

export const postProject = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/projects`, {
      ...data,
    });
    const resp = response.data;
    return resp;
  } catch (error) {
    console.error(error);
    return [];
  }
};
