import styled from "styled-components";
import { animated } from "@react-spring/web";

export const StyledSheet = styled(animated.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80vh;
  background: rgba(50, 50, 50, 0.63);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
`;

export const StyledHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
  margin: 8px auto;
  border-radius: 2px;
`;
