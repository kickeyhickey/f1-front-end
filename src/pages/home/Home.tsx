import { useEffect, useState, type JSX } from 'react';
import MainPage from '../../components/main-page/main-page.component';
import MainTable from '../../components/table/main-table.component';
import { getDrivers, getUsers } from './api/home.api';
import { Tab, TabList, TabPanel, TabPanels, Tabs, type Key } from 'react-aria-components';
import { UserPage } from '../user/user.page';
import { RacePage } from '../race/race.page';
import { DashboardPage } from '../dashboard/dashboard.page';

export function Home(): JSX.Element {
  const [drivers, setDrivers] = useState<unknown[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);
  const [tab, setTab] = useState<Key>('/dashboard');

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
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          paddingBottom: '24px',
        }}
      >
        <Tabs selectedKey={tab} onSelectionChange={() => setTab}>
          <TabList aria-label="Tabs">
            <Tab style={{ padding: '24px' }} href="/dashboard" id="dashboard">
              dashboard
            </Tab>
            <Tab style={{ padding: '24px' }} href="/user" id="user">
              User
            </Tab>
            <Tab style={{ padding: '24px' }} href="/race" id="race">
              race
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              id="dashboard"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <DashboardPage />
            </TabPanel>
            <TabPanel
              id="user"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <UserPage />
            </TabPanel>
            <TabPanel
              id="race"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <RacePage />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MainTable data={drivers} />
      </div>
    </MainPage>
  );
}
