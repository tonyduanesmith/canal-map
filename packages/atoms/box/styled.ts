import { ReactNode, CSSProperties } from "react";

import styled from "styled-components";
import spacing, { Spacing } from "../../utils/theme/spacing";

export interface BoxProps {
  position?: CSSProperties["position"];
  display?: CSSProperties["display"];
  flex?: CSSProperties["flex"];
  flexDirection?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  bgColor?: CSSProperties["backgroundColor"];
  padding?: Spacing;
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingRight?: Spacing;
  paddingLeft?: Spacing;
  margin?: Spacing;
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginRight?: Spacing;
  marginLeft?: Spacing;
  children?: ReactNode;
  style?: CSSProperties;
}

export const StyledBox = styled.div<BoxProps>`
  position: ${props => props.position || "relative"};
  display: ${props => props.display || "block"};
  flex: ${props => props.flex || "0 1 auto"};
  flex-direction: ${props => props.flexDirection || "row"};
  align-items: ${props => props.alignItems || "flex-start"};
  justify-content: ${props => props.justifyContent || "flex-start"};
  width: ${props => props.width || "auto"};
  height: ${props => props.height || "auto"};
  background-color: ${props => props.bgColor || "transparent"};
  padding: ${props => spacing[props.padding || "none"]};
  padding-left: ${props => props.paddingLeft !== undefined ? spacing[props.paddingLeft] : undefined};
  padding-right: ${props => props.paddingRight !== undefined ? spacing[props.paddingRight] : undefined};
  padding-top: ${props => props.paddingTop !== undefined ? spacing[props.paddingTop] : undefined};
  padding-bottom: ${props => props.paddingBottom !== undefined ? spacing[props.paddingBottom] : undefined};
  margin: ${props => spacing[props.margin || "none"]};
  margin-left: ${props => props.marginLeft !== undefined ? spacing[props.marginLeft] : undefined};
  margin-right: ${props => props.marginRight !== undefined ? spacing[props.marginRight] : undefined};
  margin-top: ${props => props.marginTop !== undefined ? spacing[props.marginTop] : undefined};
  margin-bottom: ${props => props.marginBottom !== undefined ? spacing[props.marginBottom] : undefined};
`;
