import Box from "../../atoms/box";
import Card from "../../atoms/card";
import LockCircleIcon from "../../atoms/icons/lock-circle";
import ListItem from "../../atoms/list-item";
import Typography from "../../atoms/typography";
import { ClosestLocation } from  "../../pages/main/utils";

interface ClosestSectionProps {
  closestLock: ClosestLocation | null;
  onClick: (item: any) => void;
}

const ClosestSection = ({closestLock, onClick}: ClosestSectionProps) => {
  const lockName = closestLock?.location?.title;
  const lockDistance = Math.ceil(closestLock?.distance ?? 0).toString();
  return (
    <Box marginTop="md">
      <Typography variant="h4">Nearest</Typography>
      <Card padding="md" display="flex">
        <Box display="flex" flexDirection="column" alignItems="center" onClick={() => onClick(closestLock?.location)}>
          <Box height="50px" width="50px">
            <LockCircleIcon />
          </Box>
          <Typography width="96px" overflow>{lockName}</Typography>
          <Typography bold>{`${lockDistance} mi`}</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ClosestSection;
