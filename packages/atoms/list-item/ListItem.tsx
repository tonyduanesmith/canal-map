import { ListChildComponentProps } from "react-window";
import LockCircleIcon from "../icons/lock-circle";
import Box from "../box";
import { useDrag } from "react-use-gesture";

import { StyledListItem } from "./styled";
import Icon from "../icons";
import theme from "../../utils/theme";
import { SystemColors } from "../../utils/theme/darkPalette";

const DRAG_THRESHOLD = 5;

interface ItemData {
  items: any[];
  onClick: (item: any) => void;
}

type ListItemProps = ListChildComponentProps<ItemData>;

const ListItem = ({ index, style, data }: ListItemProps) => {
  const item = data.items[index];
  const itemColor: keyof SystemColors = item.data.color;
  const backgroundColor = theme.dark.palette.system[itemColor].main;
  if (!item) return null;

  const bind = useDrag(({ down, distance }) => {
    if (!down && distance < DRAG_THRESHOLD) {
      data.onClick(item);
    }
  });

  return (
    <StyledListItem style={style} {...bind()}>
      <Box height="50px" width="50px" marginRight="md">
        <Icon code={item.clusteringIdentifier} backgroundColor={backgroundColor} />
      </Box>
      <div>{item.title}</div>
    </StyledListItem>
  );
};

export default ListItem;
