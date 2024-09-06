import { CloseOutline as CloseIcon } from "@styled-icons/evaicons-outline";

import LockCircleIcon from "./lock-circle";
import WindingCircleIcon from "./winding-circle";
import TrainCircleIcon from "./train-circle";

export type IconsType = keyof typeof iconsMap;

export type IconProps = {
  code: IconsType;
  color?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
};

const iconsMap: Record<string, any> = {
  lock: LockCircleIcon,
  winding: WindingCircleIcon,
  trains: TrainCircleIcon,
  close: CloseIcon,
};

const Icon: React.FC<IconProps> = ({ code, ...rest }) => {
  const IconComponent = iconsMap[code];
  return <IconComponent {...rest} />;
};

export default Icon;
