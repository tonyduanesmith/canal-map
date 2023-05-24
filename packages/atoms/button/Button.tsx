import React from "react";

import { StyledButton } from "./styled";
import { SizeType, VariantType } from "./types";

export interface Props {
  children: string | React.ReactNode;
  size?: SizeType;
  rounded?: boolean;
  variant?: VariantType;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  rounded = false,
  fullWidth = false,
  onClick,
}: Props) => {
  return (
    <StyledButton size={size} rounded={rounded} variant={variant} fullWidth={fullWidth} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
