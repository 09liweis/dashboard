interface IconProps {
  name: string;
  classNames?: string;
  text?: string;
}

function getRandomColor() {
  return `#${Math.floor(Math.random()*0xffffff).toString(16)}`
}

export default function Icon({ name, classNames = '', text = '' }: IconProps) {
  return <i style={{color:getRandomColor()}} className={`fa-solid fa-${name} ${classNames}`}>{text}</i>;
}
