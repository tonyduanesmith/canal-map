import styled from "styled-components";
import { Search as SearchIcon } from "@styled-icons/evaicons-solid";

export const StyledSearchWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const StyledSearch = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.spacing[7]};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  padding-left: ${({ theme }) => theme.spacing[7]};
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;
