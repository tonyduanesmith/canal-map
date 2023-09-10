import LockCircleIcon from "./lock-circle";
import WindingCircleIcon from "./winding-circle";
import TrainCircleIcon from "./train-circle";

type IconProps = {
  code: "lock" | "winding" | "trains";
  color?: string;
  backgroundColor?: string;
};

const iconsMap = {
  lock: LockCircleIcon,
  winding: WindingCircleIcon,
  trains: TrainCircleIcon,
};

const Icon: React.FC<IconProps> = ({ code, ...rest }) => {
  const IconComponent = iconsMap[code];
  return <IconComponent {...rest} />;
};

export default Icon;
