import { MouseEvent, useState } from "react";
import { ListChildComponentProps } from "react-window";
import LockCircleIcon from "../icons/lock-circle";
import Box from "../box";
import { useDrag } from "react-use-gesture";

import { StyledListItem } from "./styled";

const DRAG_THRESHOLD = 5;

interface ItemData {
  items: any[];
  onClick: (item: any) => void;
}

type ListItemProps = ListChildComponentProps<ItemData>;

const ListItem = ({ index, style, data }: ListItemProps) => {
  const item = data.items[index];
  if (!item) return null;

  const bind = useDrag(({ down, distance }) => {
    if (!down && distance < DRAG_THRESHOLD) {
      data.onClick(item);
      console.log("Clicked");
    }
  });

  return (
    <StyledListItem style={style} {...bind()}>
      <Box height="50px" width="50px" marginRight="md">
        <LockCircleIcon />
      </Box>
      <div>{item.title}</div>
    </StyledListItem>
  );
};

export default ListItem;
