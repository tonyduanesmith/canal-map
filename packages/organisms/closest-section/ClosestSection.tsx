import Box from "../../atoms/box";
import Card from "../../atoms/card";
import LockCircleIcon from "../../atoms/icons/lock-circle";
import ListItem from "../../atoms/list-item";
import Typography from "../../atoms/typography";

const ClosestSection = () => {
  return (
    <Box marginTop="md">
      <Typography variant="h4">Nearest</Typography>
      <Card padding="md" display="flex">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box height="50px" width="50px">
            <LockCircleIcon />
          </Box>
          <Typography>Lock</Typography>
          <Typography bold>1 mile</Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default ClosestSection;
