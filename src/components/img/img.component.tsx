interface ImageProps {
  src: string;
}

export const Logo = ({ src }: ImageProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <img style={{ width: '300px' }} src={src} />
    </div>
  );
};
