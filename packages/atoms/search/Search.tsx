import Box from "../box/Box";
import { BoxProps } from "../box/styled";
import { StyledSearch, StyledSearchIcon } from "./styled";

interface SearchProps extends BoxProps {
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Search = ({ onSearchFocus, onSearchBlur, placeholder = "Search", value, onChange, ...rest }: SearchProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <Box position="relative" flex="1" display="flex" {...rest}>
      <StyledSearch
        onFocus={onSearchFocus}
        onBlur={onSearchBlur}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
      <StyledSearchIcon size={20} />
    </Box>
  );
};

export default Search;
