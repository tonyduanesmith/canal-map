import styled from "styled-components";

export const StyledListItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.palette.neutrals[15]};
  cursor: pointer;
`;
