import axiosInst, { localApiInst } from '../../../api/axiosConfig';

export const getDrivers = async () => {
  try {
    const response = await axiosInst.get('/drivers?limit=1&offset=20');

    console.warn('response', response.data);
    return await response.data.drivers;
  } catch (error: any) {
    console.warn('error', error);
  }
};

export const getUsers = async () => {
  try {
    const response = await localApiInst.get('/users');

    console.warn('users response', response.data);
    return response.data;
  } catch (error: any) {
    console.error('error fetching users:', error);
    throw error;
  }
};

// export const factoryResetSpeedwayDevice = async (eiSerialNumber: string) => {
//   try {
//     const response = await axiosInst.put(`/beta/eiStatusUIHook`, {
//       eiSerialNumber: eiSerialNumber,
//       factoryResetDevice: true,
//     });

//     if (response.data.factoryResetDevice) {
//       showSuccess("Factory reset command sent successfully.");
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Error factory resetting device:", error);
//     showError("Failed to factory reset device.");
//   }
// };
