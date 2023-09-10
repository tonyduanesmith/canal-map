import Box from "../../atoms/box";
import Card from "../../atoms/card";
import LockCircleIcon from "../../atoms/icons/lock-circle";
import WindingCircleIcon from "../../atoms/icons/winding-circle";
import ListItem from "../../atoms/list-item";
import Typography from "../../atoms/typography";
import { ClosestLocation } from "../../pages/main/utils";
import { milesToMinutes, removeLockPattern } from "./utils";
import theme from "../../utils/theme";

interface ClosestSectionProps {
  closestLock: ClosestLocation | null;
  closestWinding: ClosestLocation | null;
  onClick: (item: any) => void;
}

const ClosestSection = ({ closestLock, onClick, closestWinding }: ClosestSectionProps) => {
  const lockName = removeLockPattern(closestLock?.location?.title ?? "");
  const lockDistanceMiles = parseFloat((closestLock?.distance ?? 0).toFixed(1));
  const lockDistanceMinutes = milesToMinutes(lockDistanceMiles);
  const windingName = closestWinding?.location?.title ?? "";
  const windingDistanceMiles = parseFloat((closestWinding?.distance ?? 0).toFixed(1));
  const windingDistanceMinutes = milesToMinutes(windingDistanceMiles);
  return (
    <Box marginTop="md">
      <Typography variant="h4">Nearest</Typography>
      <Card padding="md" display="flex">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => onClick(closestLock?.location)}
          marginRight="md"
        >
          <Box height="50px" width="50px">
            <LockCircleIcon />
          </Box>
          <Typography width="96px" textOverflow>
            {lockName}
          </Typography>
          <Typography bold>{`${lockDistanceMiles} mi/${lockDistanceMinutes} mins`}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          onClick={() => onClick(closestWinding?.location)}
        >
          <Box height="50px" width="50px">
            <WindingCircleIcon backgroundColor={theme.dark.palette.system.blue.main} />
          </Box>
          <Typography width="96px" textOverflow>
            {windingName}
          </Typography>
          <Typography bold>{`${windingDistanceMiles} mi/${windingDistanceMinutes} mins`}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ClosestSection;
