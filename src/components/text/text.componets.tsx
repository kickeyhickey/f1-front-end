import type { ReactNode } from 'react';
import style from './text.module.css';

export const DefaultText = ({ children }: { children: ReactNode }) => {
  return <p className={style.default}>{children}</p>;
};

export const BoldText = ({ children }: { children: ReactNode }) => {
  return <p className={style.bold}>{children}</p>;
};

export const BoldTitle = ({ children }: { children: ReactNode }) => {
  return <p className={style.boldTitle}>{children}</p>;
};
