import styled from "styled-components";

export const StyledLocationWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 60px;
`;

export const StyledContainer = styled.div`
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  background: rgba(50, 50, 50, 0.63);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: ${({ theme }) => theme.spacing.md};
  box-sizing: border-box;
`;
