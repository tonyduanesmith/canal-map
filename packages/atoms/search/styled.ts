import styled from "styled-components";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid";
import Box from "../box/Box";

export const StyledSearch = styled.input`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  height: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.shape.borderRadius.medium};
  border: none;
  padding-left: 34px;
  font-size: ${({ theme }) => theme.font.size.sm};
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
