import React from "react";

import { StyledButton } from "./styled";
import { SizeType, VariantType } from "./types";
import Icon, { IconsType } from "../icons";
import Box from "../box";

export interface Props {
  children: string | React.ReactNode;
  size?: SizeType;
  rounded?: boolean;
  variant?: VariantType;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  code?: IconsType;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  rounded = false,
  fullWidth = false,
  onClick,
  className,
  code,
}: Props) => {
  return (
    <StyledButton
      size={size}
      rounded={rounded}
      variant={variant}
      fullWidth={fullWidth}
      onClick={onClick}
      className={className}
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap="sm">
        {children}
        {code && <Icon code={code} />}
      </Box>
    </StyledButton>
  );
};

export default Button;
