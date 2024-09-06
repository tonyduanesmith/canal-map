import Box from "../../atoms/box";
import Card from "../../atoms/card";
import {
  getHoursAndMinutesToString,
  getKilometersToMiles,
  getMilesToMinutes,
  getMinutesToHoursAndMinutes,
} from "../../utils/helpers/distanceUtils";
import Typography from "../../atoms/typography";
import { Place } from "../../pages/main/utils";
import { getLockOperationDurationInMinutes } from "./utils";

type RouteProps = {
  distance: number;
  routeLocks: Array<Place>;
};

const Route = ({ distance, routeLocks }: RouteProps) => {
  const lockOperationDurationInMinutes = getLockOperationDurationInMinutes(routeLocks.length);
  const distanceInMiles = getKilometersToMiles(distance / 1000);
  const distanceInMinutes = getMilesToMinutes(distanceInMiles);
  const { outputHours, outputMinutes } = getMinutesToHoursAndMinutes(
    distanceInMinutes + lockOperationDurationInMinutes,
  );
  const distanceAsString = getHoursAndMinutesToString(outputMinutes, outputHours);
  return (
    <Card padding="md" marginTop="md">
      <Typography variant="h2">{distanceAsString}</Typography>
      <Typography bold>{`${distanceInMiles.toString()} Miles`}</Typography>
      {routeLocks.length !== 0 && <Typography bold>{`${routeLocks.length.toString()} Locks`}</Typography>}
    </Card>
  );
};

export default Route;
