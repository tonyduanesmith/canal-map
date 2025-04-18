type Props = {
  color?: string;
  backgroundColor?: string;
};

const BridgeCircleIcon = ({ color = "#fff", backgroundColor = "#000" }: Props) => {
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
      <circle cx="1250" cy="1250" r="1250" fill={backgroundColor} />
      <g>
        <path
          d="M1117.06,1655.38l-0.685,-793.609c-0.054,-63.199 -51.409,-114.465 -114.608,-114.41c-63.2,0.054 -114.465,51.408 -114.411,114.608l0.685,793.608c0.055,63.2 51.409,114.465 114.608,114.411c63.2,-0.055 114.466,-51.409 114.411,-114.608Z"
          style={{ fill: color }}
        />
        <path
          d="M1098.73,799.204l-152.827,-264.705c-31.6,-54.732 -101.691,-73.513 -156.423,-41.913c-54.733,31.599 -73.514,101.69 -41.914,156.422l152.828,264.705c31.599,54.733 101.69,73.513 156.423,41.914c54.732,-31.6 73.513,-101.691 41.913,-156.423Z"
          style={{ fill: color }}
        />
        <path
          d="M949.501,1984.65l152.599,-264.837c31.553,-54.759 12.711,-124.834 -42.048,-156.386c-54.76,-31.553 -124.834,-12.712 -156.387,42.048l-152.599,264.837c-31.552,54.759 -12.711,124.834 42.048,156.386c54.76,31.553 124.835,12.712 156.387,-42.048Z"
          style={{ fill: color }}
        />
      </g>
      <g>
        <path
          d="M1403.32,863.49l0.684,793.608c0.055,63.2 51.409,114.465 114.609,114.411c63.199,-0.055 114.465,-51.409 114.41,-114.608l-0.685,-793.609c-0.054,-63.199 -51.408,-114.465 -114.608,-114.41c-63.199,0.054 -114.465,51.408 -114.41,114.608Z"
          style={{ fill: color }}
        />
        <path
          d="M1421.65,1719.66l152.827,264.705c31.6,54.732 101.691,73.513 156.423,41.913c54.732,-31.6 73.513,-101.691 41.913,-156.423l-152.827,-264.705c-31.6,-54.732 -101.69,-73.513 -156.423,-41.913c-54.732,31.6 -73.513,101.69 -41.913,156.423Z"
          style={{ fill: color }}
        />
        <path
          d="M1570.88,534.219l-152.598,264.836c-31.553,54.76 -12.712,124.834 42.048,156.387c54.76,31.552 124.834,12.711 156.387,-42.048l152.599,-264.837c31.552,-54.76 12.711,-124.834 -42.049,-156.387c-54.759,-31.552 -124.834,-12.711 -156.387,42.049Z"
          style={{ fill: color }}
        />
      </g>
    </svg>
  );
};

export default BridgeCircleIcon;
