import styled from "styled-components";
import { animated } from "@react-spring/web";

export const StyledSheet = styled(animated.div)`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: calc(100% + 80px);
  background: rgba(50, 50, 50, 0.63);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.5px);
  -webkit-backdrop-filter: blur(10.5px);
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
  box-sizing: border-box;
`;

export const StyledHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: #ccc;
  margin: ${({ theme }) => theme.spacing.sm} auto;
  border-radius: 2px;
`;
