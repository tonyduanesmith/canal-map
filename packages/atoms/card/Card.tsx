import { StyledCard } from "./styled";
import { BoxProps } from "../box/styled";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const Card = ({ children, ...rest }: Props) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};
export default Card;
