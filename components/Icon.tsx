interface IconProps {
  name: string;
  handleClick?: () => void;
  classNames?: string;
  text?: string;
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
}

export default function Icon({ name, classNames = '', text = '', handleClick }: IconProps) {
  return <i onClick={handleClick} style={{ color: getRandomColor() }} className={`fa-solid fa-${name} ${classNames}`}>{text}</i>;
}
