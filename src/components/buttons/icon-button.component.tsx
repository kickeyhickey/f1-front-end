import { Button } from 'react-aria-components/Button';
import type { JSX } from 'react';

interface ButtonProps {
  img: string;
  onClick?: () => void;
}
export const IconButton = ({ img, onClick }: ButtonProps): JSX.Element => {
  return (
    <div>
      <Button style={{ background: 'none', border: 'none' }} onClick={onClick}>
        <img src={img} />
      </Button>
    </div>
  );
};
