import { VariantType } from "../button/types";
import Icon, { IconsType } from "../icons";
import { StyledIconButton } from "./styled";

type IconButtonProps = {
  code: IconsType;
  onClick?: () => void;
  variant?: VariantType;
};

const IconButton = ({ code, onClick, variant = "primary" }: IconButtonProps) => {
  return (
    <StyledIconButton onClick={onClick} rounded variant={variant}>
      <Icon code={code} width={24} height={24} />
    </StyledIconButton>
  );
};

export default IconButton;
