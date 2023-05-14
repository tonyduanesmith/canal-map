import { BoxProps, StyledBox } from "./styled";

const Box = ({ children, ...rest }: BoxProps) => {
  return <StyledBox {...rest}>{children}</StyledBox>;
};
export default Box;
