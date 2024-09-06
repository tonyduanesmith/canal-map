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
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  rounded = false,
  fullWidth = false,
  onClick,
  className,
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
      {children}
    </StyledButton>
  );
};

export default Button;
