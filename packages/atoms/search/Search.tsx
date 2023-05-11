import { StyledSearch, StyledSearchIcon, StyledSearchWrapper } from "./styled";

interface SearchProps {
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  placeholder?: string;
}

const Search = ({ onSearchFocus, onSearchBlur, placeholder = "Search" }: SearchProps) => {
  return (
    <StyledSearchWrapper>
      <StyledSearch onFocus={onSearchFocus} onBlur={onSearchBlur} placeholder={placeholder} />
      <StyledSearchIcon size={20} />
    </StyledSearchWrapper>
  );
};

export default Search;
