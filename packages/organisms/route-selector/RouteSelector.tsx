import { useEffect, useState } from "react";
import { LocationDot as LocationDotIcon } from "@styled-icons/fa-solid";
import { ThreeDotsVertical as ThreeDotsVerticalIcon, Circle as CircleIcon } from "styled-icons/bootstrap";

import Box from "../../atoms/box";
import Search from "../../atoms/search";
import IconButton from "../../atoms/icon-button";

type RouteSelectorProps = {
  startSearchValue: string;
  endSearchValue: string;
  onStartSearchValueChange: (value: string) => void;
  onEndSearchValueChange: (value: string) => void;
  onStartSearchFocus: () => void;
  onEndSearchFocus: () => void;
  onCancelRoute: () => void;
};

const RouteSelector = ({
  startSearchValue,
  endSearchValue,
  onEndSearchValueChange,
  onStartSearchValueChange,
  onStartSearchFocus,
  onCancelRoute,
  onEndSearchFocus,
}: RouteSelectorProps) => {
  const [previousStartSearchValue, setPreviousStartSearchValue] = useState(startSearchValue);
  const [previousEndSearchValue, setPreviousEndSearchValue] = useState(endSearchValue);

  useEffect(() => {
    if (previousStartSearchValue !== startSearchValue) {
      onStartSearchValueChange(startSearchValue);
      setPreviousStartSearchValue(startSearchValue);
    }
  }, [onStartSearchValueChange, startSearchValue, previousStartSearchValue]);

  useEffect(() => {
    if (previousEndSearchValue !== endSearchValue) {
      onEndSearchValueChange(endSearchValue);
      setPreviousEndSearchValue(endSearchValue);
    }
  }, [onEndSearchValueChange, endSearchValue, previousEndSearchValue]);

  return (
    <Box display="flex" gap="sm" flexDirection="column" alignItems="flex-end">
      <IconButton code="close" onClick={onCancelRoute} variant="grey" />
      <Box display="flex" alignItems="center" gap="sm" width="100%">
        <Box display="flex" flexDirection="column" alignItems="center" gap="sm">
          <CircleIcon height={16} width={16} />
          <ThreeDotsVerticalIcon height={16} width={16} />
          <LocationDotIcon height={24} width={24} />
        </Box>

        <Box gap="md" display="flex" flexDirection="column" flex="1">
          <Search
            value={startSearchValue}
            onChange={onStartSearchValueChange}
            width="100%"
            onSearchFocus={onStartSearchFocus}
          />
          <Search
            value={endSearchValue}
            onChange={onEndSearchValueChange}
            width="100%"
            onSearchFocus={onEndSearchFocus}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RouteSelector;
