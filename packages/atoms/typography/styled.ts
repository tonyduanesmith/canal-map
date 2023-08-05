import styled, { css } from "styled-components";
import { TypographyProps } from "./Typography";

type StyledTypographyProps = Omit<TypographyProps, "children">;

const h1 = css`
  font-size: ${p => p.theme.typography.fontSize.h1};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const h2 = css`
  font-size: ${p => p.theme.typography.fontSize.h2};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const h3 = css`
  font-size: ${p => p.theme.typography.fontSize.h3};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const h4 = css`
  font-size: ${p => p.theme.typography.fontSize.h4};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const h5 = css`
  font-size: ${p => p.theme.typography.fontSize.h5};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const h6 = css`
  font-size: ${p => p.theme.typography.fontSize.h6};
  font-weight: ${p => p.theme.typography.fontWeight.bold};
`;

const subtitle = css`
  font-size: ${p => p.theme.typography.fontSize.subtitle};
  font-weight: ${p => p.theme.typography.fontWeight.regular};
`;

export const StyledTypography = styled.div<StyledTypographyProps>`
  font-family: ${p => p.theme.typography.fontFamily};

  ${p => p.variant === "h1" && h1};
  ${p => p.variant === "h2" && h2};
  ${p => p.variant === "h3" && h3};
  ${p => p.variant === "h4" && h4};
  ${p => p.variant === "h5" && h5};
  ${p => p.variant === "h6" && h6};
  ${p => p.variant === "subtitle" && subtitle};
  ${p => p.bold && `font-weight: ${p.theme.typography.fontWeight.bold}`};
`;
