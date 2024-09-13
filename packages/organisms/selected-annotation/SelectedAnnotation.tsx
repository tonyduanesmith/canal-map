import { useEffect, useState } from "react";

import Box from "../../atoms/box";
import Card from "../../atoms/card";
import Typography from "../../atoms/typography";
import { getAddress } from "./utils";
import Divider from "../../atoms/divider";
import Button from "../../atoms/button";
import { AddressType, Coordinate } from "../../pages/main/utils";

type SelectedAnnotationProps = {
  title: string;
  coords: Coordinate;
  onSetStartAnnotation: () => void;
  onSetEndAnnotation: () => void;
  address?: AddressType;
};

const SelectedAnnotation = ({
  title,
  coords,
  onSetStartAnnotation,
  onSetEndAnnotation,
  address,
}: SelectedAnnotationProps) => {
  return (
    <Box>
      <Typography variant="h2">{title}</Typography>
      <Box display="flex" justifyContent="space-between" paddingTop="md" paddingBottom="md" gap="md">
        <Button onClick={onSetStartAnnotation} fullWidth code="location">
          Set Start Point
        </Button>
        <Button onClick={onSetEndAnnotation} fullWidth code="flagCheckered">
          Set Destination
        </Button>
      </Box>
      <Typography variant="h4">Details</Typography>
      <Card padding="md" display="flex">
        {address && (
          <Box display="flex" flexDirection="column" flex={1}>
            <Typography bold>Address</Typography>
            <Typography color="">{address.name}</Typography>
            <Typography>{address.subLocality}</Typography>
            <Typography>{address.locality}</Typography>
            <Typography>{address.postCode}</Typography>
            <Typography>{address.administrativeArea}</Typography>
            <Divider />
            <Typography bold>Coordinates</Typography>
            <Typography color="">{`${coords[0]}, ${coords[1]}`}</Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default SelectedAnnotation;
