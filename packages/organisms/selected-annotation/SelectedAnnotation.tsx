import { useEffect, useState } from "react";

import Box from "../../atoms/box";
import Card from "../../atoms/card";
import Typography from "../../atoms/typography";
import { getAddress } from "./utils";
import Divider from "../../atoms/divider";
import Button from "../../atoms/button";
import { Coordinate } from "../../pages/main/utils";

type SelectedAnnotationProps = {
  title: string;
  coords: Coordinate;
  onSetStartAnnotation: () => void;
  onSetEndAnnotation: () => void;
};

const SelectedAnnotation = ({ title, coords, onSetStartAnnotation, onSetEndAnnotation }: SelectedAnnotationProps) => {
  const [address, setAddress] = useState<mapkit.Place | null>(null);
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddress(coords);
        setAddress(address.results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    if (coords) {
      fetchAddress();
    }
  }, [coords]);

  return (
    <Box marginTop="md">
      <Typography variant="h2">{title}</Typography>
      <Box display="flex" justifyContent="space-between" paddingTop="md" paddingBottom="md">
        <Button onClick={onSetStartAnnotation}>Set Start Point</Button>
        <Button onClick={onSetEndAnnotation}>Set Destination</Button>
      </Box>
      <Typography variant="h4">Details</Typography>
      <Card padding="md" display="flex">
        {address && (
          <Box display="flex" flexDirection="column" flex={1}>
            <Typography bold>Address</Typography>
            <Typography color="">{address.name}</Typography>
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
