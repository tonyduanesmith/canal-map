import styled from "styled-components";

export const StyledDivider = styled.div`
  border-bottom: 1px solid ${p => p.theme.palette.neutrals[12]};
  width: 100%;
  margin-top: ${p => p.theme.spacing.sm};
  margin-bottom: ${p => p.theme.spacing.sm};
`;
