import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

export const submitRequirement = async (data: any) => {
  const response = await api.post('/requirements', data);
  return response.data;
};

export const getRequirements = async (): Promise<any[]> => {
  const response = await api.get('/requirements');
  return response.data;
};
