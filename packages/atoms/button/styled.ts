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
  background-color: ${p => p.theme.palette.colour.red};
  color: white;
`;

const fullWidth = css`
  width: 100%;
`;

export const StyledButton = styled.button<Props>`
  min-width: ${p => p.theme.spacing.xl};
  color: ${p => p.theme.palette.primary.main};
  border-radius: ${p => p.theme.shape.radius};
  outline: none;
  background-color: ${p => p.theme.palette.background.default};
  box-shadow: ${p => p.theme.palette.shadow[2]};
  border: 1px solid ${p => p.theme.palette.divider};
  margin: ${p => p.theme.spacing.sm};
  cursor: pointer;
  &:hover {
    box-shadow: ${p => p.theme.palette.shadow[1]};
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
