import type React from 'react';
import style from './main-page.module.css';
import MainHeader from '../header/header.component';

export default function MainPage({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.background}>
      <MainHeader />
      {children}
    </div>
  );
}
