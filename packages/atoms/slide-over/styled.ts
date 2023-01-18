import styled from "styled-components";

export const StyledCard = styled.div<{ position: number }>`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: ${p => p.position}px;
  background: rgba(50, 50, 50, 0.63);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  transition: top 0.1s ease-out 0s;
`;
