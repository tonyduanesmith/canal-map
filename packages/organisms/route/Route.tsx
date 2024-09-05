import Box from "../../atoms/box";
import Card from "../../atoms/card";
import {
  getHoursAndMinutesToString,
  getKilometersToMiles,
  getMilesToMinutes,
  getMinutesToHoursAndMinutes,
} from "../../utils/helpers/distanceUtils";
import Typography from "../../atoms/typography";

type RouteProps = {
  distance: number;
};

const Route = ({ distance }: RouteProps) => {
  const distanceInMiles = getKilometersToMiles(distance / 1000);
  const distanceInMinutes = getMilesToMinutes(distanceInMiles);
  const { outputHours, outputMinutes } = getMinutesToHoursAndMinutes(distanceInMinutes);
  const distanceAsString = getHoursAndMinutesToString(outputMinutes, outputHours);
  return (
    <Card padding="md" marginTop="md">
      <Typography variant="h2">{distanceAsString}</Typography>
      <Typography bold>{`${distanceInMiles.toString()} Miles`}</Typography>
    </Card>
  );
};

export default Route;
