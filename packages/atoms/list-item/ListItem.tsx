import { ListChildComponentProps } from "react-window";
import LockCircleIcon from "../icons/lock-circle";
import Box from "../box";

import { StyledListItem } from "./styled";

interface ItemData {
  items: any[];
  onClick: (item: any) => void;
}

type ListItemProps = ListChildComponentProps<ItemData>;

const ListItem = ({ index, style, data }: ListItemProps) => {
  const item = data.items[index];
  if (!item) return null;
  return (
    <StyledListItem style={style} onClick={() => data.onClick(item)}>
      <Box height="50px" width="50px" marginRight="md">
        <LockCircleIcon />
      </Box>
      <div>{item.title}</div>
    </StyledListItem>
  );
};

export default ListItem;
