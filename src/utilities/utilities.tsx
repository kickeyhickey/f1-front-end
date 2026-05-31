import { localApiInst } from '../api/axiosConfig';

export const getCurrentUser = async () => {
  try {
    const response = await localApiInst.get('/current-user');
    console.warn('response', response);

    return response.data;
  } catch (error: unknown) {
    console.error('error fetching current user', error);
  }
};
