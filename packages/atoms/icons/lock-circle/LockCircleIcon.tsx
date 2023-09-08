type Props = {
  color?: string;
  backgroundColor?: string;
}

const LockCircleIcon = ({color = '#fff', backgroundColor = '#000'}:Props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 2500 2500"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
        width: "100%",
        height: "100%",
      }}
    >
      <circle cx="1250" cy="1250" r="1250" fill={backgroundColor}/>
      <g>
        <path
          d="M1170.09,1977.26l383.087,-664.851c30.508,-52.946 12.29,-120.699 -40.655,-151.206c-52.946,-30.508 -120.7,-12.291 -151.207,40.655l-383.087,664.851c-30.508,52.946 -12.291,120.699 40.655,151.207c52.946,30.507 120.7,12.29 151.207,-40.656Z"
          style={{ fill:color}}
        />
        <path
          d="M1553.17,1200.39l-383.661,-664.52c-30.553,-52.919 -98.322,-71.078 -151.241,-40.525c-52.92,30.553 -71.078,98.322 -40.525,151.242l383.66,664.52c30.553,52.919 98.323,71.078 151.242,40.525c52.92,-30.553 71.078,-98.322 40.525,-151.242Z"
          style={{ fill:color }}
        />
      </g>
    </svg>
  );
};

export default LockCircleIcon;
