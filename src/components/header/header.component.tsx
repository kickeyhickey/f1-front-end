import { SignedIn, UserButton } from '@clerk/clerk-react';
import style from './header.module.css';
import IconHamburger from '../../assets/images/icons/hamburger-icon.svg';
import { IconButton } from '../buttons/icon-button.component';
import { HeaderTitle } from '../text/text.component';

export default function MainHeader() {
  return (
    <div className={style.header}>
      <div style={{ padding: '8px' }}>
        <IconButton img={IconHamburger} />
      </div>
      <HeaderTitle>F1</HeaderTitle>
      <div style={{ padding: '8px' }}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
