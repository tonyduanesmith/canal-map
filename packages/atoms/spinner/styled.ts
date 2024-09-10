import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg);
    }
`;

export const StyledSpinner = styled.div`
  border: 10px solid ${p => p.theme.palette.neutrals[5]};
  border-top: 10px solid ${p => p.theme.palette.variants.primary.main};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 1s linear infinite;
`;
