import style from './header.module.css';
import settingsIcon from '../../../public/icons/icon-settings-white.svg';
import hamburgerIcon from '../../../public/icons/icon-hamburger-white.svg';
import { BoldTitle } from '../text/text.componets';

export default function MainHeader() {
  return (
    <div className={style.header}>
      <button onClick={() => console.warn('CLICK')}>
        <img src={settingsIcon} />
      </button>
      <BoldTitle>F1</BoldTitle>
      <button>
        <img src={hamburgerIcon} />
      </button>
    </div>
  );
}
