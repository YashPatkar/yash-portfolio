interface Props {
  size?: number;
  color?: string;
  className?: string;
}

const OvalLogo = ({ size = 36, color = 'currentColor', className = '' }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="18" cy="18" rx="6" ry="14" stroke={color} strokeWidth="2" />
      <ellipse cx="18" cy="18" rx="3" ry="9" stroke={color} strokeWidth="2" />
      <circle cx="18" cy="18" r="1.4" fill={color} />
    </svg>
  );
};

export default OvalLogo;
