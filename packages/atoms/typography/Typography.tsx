import { StyledTypography } from "./styled";

export interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle";
  children: string;
  bold?: boolean;
}

const Typography = ({ variant, bold, children }: TypographyProps) => {
  return (
    <StyledTypography variant={variant} bold={bold}>
      {children}
    </StyledTypography>
  );
};
export default Typography;
