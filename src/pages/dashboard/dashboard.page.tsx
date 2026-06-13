import { useState, useEffect } from 'react';
import MainPage from '../../components/main-page/main-page.component';
import MainTable from '../../components/table/main-table.component';
import { getDrivers, getUsers } from '../../utilities/utilities';
import { headerTitles } from './dashboard.configs';

export const DashboardPage = () => {
  const [pageData, setPageData] = useState({ drivers: [], users: [] });

  useEffect(() => {
    // Define it directly inside the effect
    const getPageData = async () => {
      try {
        const driversData = await getDrivers();
        const usersData = await getUsers();

        setPageData({
          drivers: driversData,
          users: usersData,
        });
      } catch (error) {
        console.error('Failed to fetch page data:', error);
      }
    };

    void getPageData();
  }, []);

  const { users, drivers } = pageData;

  console.warn('users', users);

  return (
    <MainPage>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable headerTitles={headerTitles} data={drivers} />
      </div>
    </MainPage>
  );
};
