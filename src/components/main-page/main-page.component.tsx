import type React from 'react';
import style from './main-page.module.css';
import MainHeader from '../header/header.component';
import { TabNavigation } from '../tab-navigation/tabs.component';

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <MainHeader />
      <TabNavigation />
      <div className={style.body}>{children}</div>
    </div>
  );
}
