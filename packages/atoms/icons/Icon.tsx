import { CloseOutline as CloseIcon } from "@styled-icons/evaicons-outline";
import { LocationDot as LocationDotIcon, FlagCheckered as FlagCheckeredIcon } from "@styled-icons/fa-solid";

import LockCircleIcon from "./lock-circle";
import WindingCircleIcon from "./winding-circle";
import TrainCircleIcon from "./train-circle";
import BridgeCircleIcon from "./bridge-circle";

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
  location: LocationDotIcon,
  flagCheckered: FlagCheckeredIcon,
  bridge: BridgeCircleIcon,
};

const Icon: React.FC<IconProps> = ({ code, width = 24, height = 24, ...rest }) => {
  const IconComponent = iconsMap[code];
  if (!IconComponent) {
    console.warn(`Icon code "${code}" is not mapped to a component.`);
    return null;
  }
  return <IconComponent width={width} height={height} {...rest} />;
};

export default Icon;
