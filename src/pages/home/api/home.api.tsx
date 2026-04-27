// import axiosInst from "../api/axiosInst";

// export const getDrivers = async () => {
//     try {
//         const response = await axiosInst.get("https://f1connectapi.vercel.app/api/drivers?limit=1&offset=20",{

//         })
//         console.warn('response',response);

//     }catch (error:any){
// console.warn('error',error);

//     }
// }


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
