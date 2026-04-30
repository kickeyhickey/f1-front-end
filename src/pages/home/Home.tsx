import { useEffect, useState, type JSX } from 'react';
import MainPage from '../../components/main-page/main-page.component';
import MainTable from '../../components/table/main-table.component';
import { getDrivers, getUsers } from './api/home.api';

export function Home(): JSX.Element {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchDrivers = async () => {
      try {
        const data = await getDrivers();
        if (isMounted && data) {
          setDrivers(data);
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        if (isMounted && data) {
          setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  console.warn('drivers', drivers);
  console.warn('users', users);

  return (
    <MainPage>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable data={drivers} />
      </div>
    </MainPage>
  );
}
