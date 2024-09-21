import { ListChildComponentProps } from "react-window";
import LockCircleIcon from "../icons/lock-circle";
import Box from "../box";
import { useDrag } from "react-use-gesture";

import { StyledListItem } from "./styled";
import Icon from "../icons";
import theme from "../../utils/theme";
import { PaletteSystemColours } from "../../utils/theme/darkPalette";
import { getDistanceInMiles } from "../../pages/main/utils";
import Typography from "../typography";

const DRAG_THRESHOLD = 5;

interface ItemData {
  items: any[];
  onClick: (item: any) => void;
  currentLocation: GeolocationCoordinates;
}

type ListItemProps = ListChildComponentProps<ItemData>;

const ListItem = ({ index, style, data }: ListItemProps) => {
  const item = data.items[index];
  const currentLocation = data.currentLocation;
  const itemColor: keyof PaletteSystemColours = item.data.color;
  const backgroundColor = theme.dark.palette.system[itemColor].main;
  if (!item) return null;

  const coordinates: GeolocationCoordinates = {
    latitude: item.coordinate.latitude,
    longitude: item.coordinate.longitude,
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  };

  const distanceInMiles = getDistanceInMiles(currentLocation, coordinates).toFixed(1);

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
      <Box>
        <Typography bold>{item.title}</Typography>
        <Typography>{item.data.address.subLocality}</Typography>
        <Typography>{`${distanceInMiles} miles`}</Typography>
      </Box>
    </StyledListItem>
  );
};

export default ListItem;
