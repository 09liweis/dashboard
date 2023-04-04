interface IconProps {
  name: string;
  classNames: string;
  text: string;
}
export default function Icon({ name, classNames = '', text = '' }: IconProps) {
  return <i className={`fa-solid fa-${name} ${classNames}`}>{text}</i>;
}
