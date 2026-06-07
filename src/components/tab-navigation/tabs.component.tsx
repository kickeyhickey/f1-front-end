import { DashboardPage } from '../../pages/dashboard/dashboard.page';
import { Tab, TabList, TabPanel, TabPanels, Tabs, type Key } from 'react-aria-components';

import { RacePage } from '../../pages/race/race.page';
import { UserPage } from '../../pages/user/user.page';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import style from './tabs.module.css';

export function TabNavigation() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Key>('/dashboard');

  const getNavigation = (id: string) => {
    if (id === 'user') return navigate('/user');
    if (id === 'race') return navigate('/race');

    return navigate('/dashboard');
  };

  return (
    <Tabs selectedKey={tab} onSelectionChange={() => setTab}>
      <TabList className={style.tabList} aria-label="Tabs">
        <Tab className={style.tab} id="dashboard" onClick={() => getNavigation('dashboard')}>
          dashboard
        </Tab>
        <Tab
          className={style.tab}
          onClick={() => getNavigation('user')}
          style={{ padding: '24px' }}
          id="user"
        >
          User
        </Tab>
        <Tab
          className={style.tab}
          onClick={() => getNavigation('race')}
          style={{ padding: '24px' }}
          id="race"
        >
          race
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="dashboard">
          <DashboardPage />
        </TabPanel>
        <TabPanel id="user">
          <UserPage />
        </TabPanel>
        <TabPanel id="race">
          <RacePage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
