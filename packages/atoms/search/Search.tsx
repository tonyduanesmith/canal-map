import { StyledSearch, StyledSearchIcon, StyledSearchWrapper } from "./styled";

interface SearchProps {
  onSearchFocus: () => void;
  onSearchBlur?: () => void;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Search = ({ onSearchFocus, onSearchBlur, placeholder = "Search", value, onChange }: SearchProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <StyledSearchWrapper>
      <StyledSearch
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
      <StyledSearchIcon size={20} />
    </StyledSearchWrapper>
  );
};

export default Search;
