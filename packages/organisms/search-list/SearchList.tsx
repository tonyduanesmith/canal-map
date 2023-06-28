import { useRef } from "react";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ListItem from "../../atoms/list-item";

interface SearchListProps {
  isScrollable: boolean;
  onScroll: (props: ListOnScrollProps) => void;
  itemCount: number;
  items: any[];
  onClick: (item: any) => void;
}

const SearchList = ({ isScrollable, onScroll, itemCount = 0, items = [], onClick }: SearchListProps) => {
  const innerListRef = useRef<List>(null);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          onScroll={onScroll}
          innerRef={innerListRef}
          style={{ overflow: isScrollable ? "auto" : "hidden" }}
          height={(height ?? 0) - 100}
          itemSize={80}
          itemCount={itemCount}
          width={width ?? 0}
          itemData={{ items, onClick }}
        >
          {ListItem}
        </List>
      )}
    </AutoSizer>
  );
};

export default SearchList;
