import { BoxProps } from "../box/styled";
import { StyledTypography } from "./styled";

export interface TypographyProps extends BoxProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle";
  children?: string;
  bold?: boolean;
  textOverflow?: boolean;
}

const Typography = ({ variant, bold, children, textOverflow = false, ...rest }: TypographyProps) => {
  return (
    <StyledTypography variant={variant} bold={bold} textOverflow={textOverflow} {...rest}>
      {children}
    </StyledTypography>
  );
};
export default Typography;
