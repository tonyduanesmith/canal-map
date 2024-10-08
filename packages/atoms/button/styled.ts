import styled, { css } from "styled-components";

import { Props } from "./Button";

const small = css`
  padding-left: ${p => p.theme.spacing.sm};
  padding-right: ${p => p.theme.spacing.sm};
  font-size: ${p => p.theme.typography.fontSize.sm};
`;

export const medium = css`
  padding-left: ${p => p.theme.spacing.md};
  padding-right: ${p => p.theme.spacing.md};
  padding-top: ${p => p.theme.spacing.sm};
  padding-bottom: ${p => p.theme.spacing.sm};
  font-size: ${p => p.theme.typography.fontSize.md};
`;

const large = css`
  padding-left: ${p => p.theme.spacing.lg};
  padding-right: ${p => p.theme.spacing.lg};
  font-size: ${p => p.theme.typography.fontSize.lg};
`;

const rounded = css`
  border-radius: 100px;
`;

const danger = css`
  background-color: ${p => p.theme.palette.variants.danger.main};
  color: ${p => p.theme.palette.common.white};
`;

const primary = css`
  background-color: ${p => p.theme.palette.variants.primary.main};
  color: ${p => p.theme.palette.common.white};
`;

const secondary = css`
  background-color: ${p => p.theme.palette.variants.secondary.main};
  color: ${p => p.theme.palette.common.white};
`;

const tertiary = css`
  background-color: ${p => p.theme.palette.variants.tertiary.main};
  color: ${p => p.theme.palette.common.black};
  svg {
    opacity: 0.55;
  }
  :hover {
    svg {
      opacity: 1;
    }
  }
  :active {
    background-color: ${p => p.theme.palette.variants.tertiary.dark};
  }
`;

const grey = css`
  background-color: ${p => p.theme.palette.neutrals[9]};
  color: ${p => p.theme.palette.common};
`;

const fullWidth = css`
  width: 100%;
`;

export const StyledButton = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${p => p.theme.shape.borderRadius.sm};
  outline: none;
  border: none;
  cursor: pointer;
  padding: auto;
  min-width: 45px;

  &:hover,
  :focus,
  :active {
    outline: none;
    box-shadow: none;
    border: none;
  }

  ${p => p.size === "small" && small};
  ${p => p.size === "medium" && medium};
  ${p => p.size === "large" && large};
  ${p => p.variant === "danger" && danger};
  ${p => p.variant === "primary" && primary};
  ${p => p.variant === "secondary" && secondary};
  ${p => p.variant === "tertiary" && tertiary};
  ${p => p.variant === "grey" && grey};
  ${p => p.rounded && rounded};
  ${p => p.fullWidth && fullWidth};
`;
