import { BoxProps } from "../box/styled";
import { StyledTypography } from "./styled";

export interface TypographyProps extends BoxProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle";
  children?: string;
  bold?: boolean;
  overflow?: boolean;
}

const Typography = ({ variant, bold, children, overflow = false, ...rest }: TypographyProps) => {
  return (
    <StyledTypography variant={variant} bold={bold} overflow={overflow} {...rest}>
      {children}
    </StyledTypography>
  );
};
export default Typography;
