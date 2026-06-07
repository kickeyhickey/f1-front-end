import type React from 'react';
import style from './main-page.module.css';
import MainHeader from '../header/header.component';
import { Tab, TabList, TabPanel, TabPanels, Tabs, type Key } from 'react-aria-components';
import { DashboardPage } from '../../pages/dashboard/dashboard.page';
import { RacePage } from '../../pages/race/race.page';
import { UserPage } from '../../pages/user/user.page';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function MainPage({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Key>('/dashboard');

  const getNavigation = (id: string) => {
    if (id === 'user') return navigate('/user');
    if (id === 'race') return navigate('/race');

    return navigate('/dashboard');
  };

  return (
    <div className={style.background}>
      <MainHeader />
      <div style={{ height: '70%' }}>{children}</div>
      <div
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          bottom: 0,
          background: 'gray',
        }}
      >
        <Tabs selectedKey={tab} onSelectionChange={() => setTab}>
          <TabList
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
              justifyContent: 'center',
              display: 'flex',
              flexWrap: 'nowrap',
              bottom: 0,
              width: '100%',
              position: 'fixed',
              background: 'gray',
            }}
            aria-label="Tabs"
          >
            <Tab
              style={{
                color: 'white',
                width: '100px',
                padding: '24px',
                border: '2px solid #4b5563',
                textAlign: 'center',
              }}
              id="dashboard"
              onClick={() => getNavigation('dashboard')}
            >
              dashboard
            </Tab>
            <Tab onClick={() => getNavigation('user')} style={{ padding: '24px' }} id="user">
              User
            </Tab>
            <Tab onClick={() => getNavigation('race')} style={{ padding: '24px' }} id="race">
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
      </div>
    </div>
  );
}
