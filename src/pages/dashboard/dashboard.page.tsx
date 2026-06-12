import { useState, useEffect } from 'react';
import MainPage from '../../components/main-page/main-page.component';
import MainTable from '../../components/table/main-table.component';
import { getDrivers, getUsers } from '../../utilities/utilities';

export const DashboardPage = () => {
  const [drivers, setDrivers] = useState<unknown[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);

  const getPageData = async () => {
    const drivers = await getDrivers();
    const users = await getUsers();

    setDrivers(drivers);
    setUsers(users);
  };

  // TODO
  // import { useEffect } from 'react';
  // import { fetchUserData, fetchAllProducts } from '../services/api';
  // import { useApi } from '../hooks/useApi';

  // export default function Dashboard({ userId }) {
  //   // 1. Initialize your API states
  //   const userApi = useApi(fetchUserData);
  //   const productsApi = useApi(fetchAllProducts);

  //   // 2. Standard useEffect triggers it when dependencies change
  //   useEffect(() => {
  //     userApi.execute(userId);
  //     productsApi.execute();
  //   }, [userId]); // Standard, predictable React dependency array

  //   if (userApi.loading || productsApi.loading) return <p>Loading...</p>;

  //   return (
  //     <div>
  //       <h1>Welcome, {userApi.data?.name}</h1>
  //       {/* You can also use execute inline for button clicks! */}
  //       <button onClick={() => productsApi.execute()}>Refresh Products</button>
  //     </div>
  //   );
  // }

  useEffect(() => {
    void getPageData();
  }, []);

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchDrivers = async () => {
  //     try {
  //       const data = await getDrivers();
  //       if (isMounted && data) {
  //         setDrivers(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching drivers:', error);
  //     }
  //   };

  //   const fetchUsers = async () => {
  //     try {
  //       const data = await getUsers();
  //       if (isMounted && data) {
  //         setUsers(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching drivers:', error);
  //     }
  //   };

  //   fetchDrivers();
  //   fetchUsers();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  console.warn('drivers', drivers);
  console.warn('users', users);
  return (
    <MainPage>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable data={drivers} />
      </div>
    </MainPage>
  );
};
