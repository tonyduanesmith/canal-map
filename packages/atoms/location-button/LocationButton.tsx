import Button from "../button";
import { LocationArrow as LocationArrowIcon } from "@styled-icons/fa-solid";

const LocationButton = () => {
  const handleOnClick = () => {
    console.log("LocationButton");
  };
  return (
    <Button onClick={handleOnClick} size="small" variant="tertiary">
      <LocationArrowIcon height={16} width={16} />
    </Button>
  );
};

export default LocationButton;
