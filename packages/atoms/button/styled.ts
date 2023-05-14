import styled, { css } from "styled-components";

import { Props } from "./Button";

const small = css`
  height: ${p => p.theme.size.sm};
  padding-left: ${p => p.theme.spacing.sm};
  padding-right: ${p => p.theme.spacing.sm};
  font-size: ${p => p.theme.typography.button.fontSize.sm};
`;

export const medium = css`
  height: ${p => p.theme.size.md};
  padding-left: ${p => p.theme.spacing.md};
  padding-right: ${p => p.theme.spacing.md};
  font-size: ${p => p.theme.typography.button.fontSize.md};
`;

const large = css`
  height: ${p => p.theme.size.lg};
  padding-left: ${p => p.theme.spacing.lg};
  padding-right: ${p => p.theme.spacing.lg};
  font-size: ${p => p.theme.typography.button.fontSize.lg};
`;

const rounded = css`
  border-radius: 100px;
`;

const danger = css`
  background-color: ${p => p.theme.palette.system.red};
  color: white;
`;

const fullWidth = css`
  width: 100%;
`;

export const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${p => p.theme.spacing.xl};
  color: ${p => p.theme.palette.common.white};
  border-radius: ${p => p.theme.shape.radius};
  outline: none;
  background-color: ${p => p.theme.palette.system.blue};
  border: 1px solid ${p => p.theme.palette.divider};
  cursor: pointer;
  padding: auto;
  &:hover {
    transition: box-shadow 0.2s ease-in-out;
  }
  &:active {
    box-shadow: ${p => p.theme.palette.shadow[0]};
    transition: all 0.2s ease-in-out;
  }

  ${p => p.size === "small" && small};
  ${p => p.size === "medium" && medium};
  ${p => p.size === "large" && large};
  ${p => p.rounded && rounded};
  ${p => p.intent && danger};
  ${p => p.fullWidth && fullWidth};
`;
