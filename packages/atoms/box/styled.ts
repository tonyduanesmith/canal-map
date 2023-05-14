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
  padding-left: ${props => spacing[props.paddingLeft || "none"]};
  padding-right: ${props => spacing[props.paddingRight || "none"]};
  padding-top: ${props => spacing[props.paddingTop || "none"]};
  padding-bottom: ${props => spacing[props.paddingBottom || "none"]};
  margin: ${props => spacing[props.margin || "none"]};
  margin-left: ${props => spacing[props.marginLeft || "none"]};
  margin-right: ${props => spacing[props.marginRight || "none"]};
  margin-top: ${props => spacing[props.marginTop || "none"]};
  margin-bottom: ${props => spacing[props.marginBottom || "none"]};
`;
