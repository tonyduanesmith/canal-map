type Props = {
  color?: string;
  backgroundColor?: string;
};

const WindingCircleIcon = ({ color = "#fff", backgroundColor = "#000" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeLinecap: "round",
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 600 600"
    >
      <circle
        cx="282.674"
        cy="305.99"
        r="219.177"
        transform="translate(-86.911 -118.825) scale(1.36875)"
        fill={backgroundColor}
      />
      <path
        d="M518.56 347.975c0 98.18-79.71 177.89-177.891 177.89-98.18 0-177.89-79.71-177.89-177.89 0-98.181 79.71-177.891 177.89-177.891"
        style={{
          stroke: color,
          strokeWidth: "67.6px",
        }}
        transform="matrix(.73964 0 0 .73964 47.111 46.54)"
      />
      <path
        d="m322.029 110.794-68.695-75.472 68.695 75.472Z"
        style={{
          stroke: color,
          strokeWidth: "63.55px",
        }}
        transform="matrix(.88356 0 0 .67636 63.416 93.105)"
      />
      <path
        d="m322.029 110.794-68.695-75.472 68.695 75.472Z"
        style={{
          stroke: color,
          strokeWidth: "63.55px",
        }}
        transform="matrix(0 .88356 -.67636 0 370.6 -53.373)"
      />
    </svg>
  );
};

export default WindingCircleIcon;
