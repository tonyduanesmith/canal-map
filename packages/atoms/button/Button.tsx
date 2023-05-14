import React from "react";

import { StyledButton } from "./styled";
import { SizeType, IntentType } from "./types";

export interface Props {
  children: string;
  size?: SizeType;
  rounded?: boolean;
  intent?: IntentType;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = ({ children, intent, size = "medium", rounded = false, fullWidth = false, onClick }: Props) => {
  return (
    <StyledButton type="submit" size={size} rounded={rounded} intent={intent} fullWidth={fullWidth} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
