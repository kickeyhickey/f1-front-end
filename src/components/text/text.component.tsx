import type { PropsWithChildren } from 'react';
import style from './text.module.css';

export const PrimaryText = ({ children }: PropsWithChildren) => {
  return <p className={style.primaryText}>{children}</p>;
};

export const BoldText = ({ children }: PropsWithChildren) => {
  return <p className={style.boldText}>{children}</p>;
};

export const HeaderTitle = ({ children }: PropsWithChildren) => {
  return <h3 className={style.headerTitle}>{children}</h3>;
};
