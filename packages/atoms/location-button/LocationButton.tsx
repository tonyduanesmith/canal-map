import Button from "../button";
import { LocationArrow as LocationArrowIcon } from "@styled-icons/fa-solid";

interface Props {
  onClick: () => void;
}

const LocationButton = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick} size="small" variant="tertiary">
      <LocationArrowIcon height={16} width={16} />
    </Button>
  );
};

export default LocationButton;
