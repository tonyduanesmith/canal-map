import Box from "../../atoms/box";
import Card from "../../atoms/card";
import LockCircleIcon from "../../atoms/icons/lock-circle";
import WindingCircleIcon from "../../atoms/icons/winding-circle";
import Typography from "../../atoms/typography";
import { ClosestLocation } from "../../pages/main/utils";
import { removeLockPattern } from "./utils";
import theme from "../../utils/theme";
import TrainCircleIcon from "../../atoms/icons/train-circle";
import { getMilesToMinutes } from "../../utils/helpers/distanceUtils/";

interface ClosestSectionProps {
  closestLock: ClosestLocation | null;
  closestWinding: ClosestLocation | null;
  closestTrains: ClosestLocation | null;
  onClick: (item: any) => void;
}

const ClosestSection = ({ closestLock, onClick, closestWinding, closestTrains }: ClosestSectionProps) => {
  const lockName = removeLockPattern(closestLock?.location?.title ?? "");
  const lockDistanceMiles = parseFloat((closestLock?.distance ?? 0).toFixed(1));
  const lockDistanceMinutes = getMilesToMinutes(lockDistanceMiles);
  const windingName = closestWinding?.location?.title ?? "";
  const windingDistanceMiles = parseFloat((closestWinding?.distance ?? 0).toFixed(1));
  const windingDistanceMinutes = getMilesToMinutes(windingDistanceMiles);
  const trainName = closestTrains?.location?.title ?? "";
  const trainDistanceMiles = parseFloat((closestTrains?.distance ?? 0).toFixed(1));
  const trainDistanceMinutes = getMilesToMinutes(trainDistanceMiles);
  return (
    <Box marginTop="md">
      <Typography variant="h4">Nearest</Typography>
      <Card padding="md" display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" alignItems="center" onClick={() => onClick(closestLock?.location)}>
          <Box height="50px" width="50px">
            <LockCircleIcon />
          </Box>
          <Typography width="96px" textOverflow>
            {lockName}
          </Typography>
          <Typography bold>{`${lockDistanceMiles} mi/${lockDistanceMinutes}m`}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => onClick(closestWinding?.location)}
        >
          <Box height="50px" width="50px">
            <WindingCircleIcon backgroundColor={theme.dark.palette.system.orange.main} />
          </Box>
          <Typography width="96px" textOverflow>
            {windingName}
          </Typography>
          <Typography bold>{`${windingDistanceMiles} mi/${windingDistanceMinutes} m`}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" onClick={() => onClick(closestTrains?.location)}>
          <Box height="50px" width="50px">
            <TrainCircleIcon backgroundColor={theme.dark.palette.system.teal.main} />
          </Box>
          <Typography width="96px" textOverflow>
            {trainName}
          </Typography>
          <Typography bold>{`${trainDistanceMiles} mi/${trainDistanceMinutes} m`}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ClosestSection;
