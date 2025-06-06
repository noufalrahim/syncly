import { BASE_URL, loggedInUser } from '@/constants';
import axios from 'axios';

export const getProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users?id=${loggedInUser.id}`);
    const resp = response.data;
    const projectsData = [];
    const projects = resp[0].projects;
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const response = await axios.get(`${BASE_URL}/projects?id=${project}`);
      const resp = response.data;
      projectsData.push(resp[0]);
    }
    return projectsData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
