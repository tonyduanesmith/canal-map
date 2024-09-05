const MILES_PER_KILOMETER = 0.621371;
const AVERAGE_CRUISE_SPEED_MPH = 3;

export const getKilometersToMiles = (kilometers: number): number =>
  parseFloat((kilometers * MILES_PER_KILOMETER).toFixed(1));

export const getMilesToMinutes = (miles: number): number => {
  let minutes = Math.ceil((miles / AVERAGE_CRUISE_SPEED_MPH) * 60);

  return minutes;
};

export const getMinutesToHoursAndMinutes = (inputMinutes: number): { outputMinutes: number; outputHours: number } => {
  const outputHours = Math.floor(inputMinutes / 60);
  const outputMinutes = inputMinutes % 60;

  return { outputMinutes, outputHours };
};

export const getHoursAndMinutesToString = (minutes: number, hours: number): string => {
  if (hours > 1 && minutes > 1) {
    return `${hours} hrs ${minutes} mins`;
  } else if (hours > 1 && minutes === 1) {
    return `${hours} hrs ${minutes} min`;
  } else if (hours === 1 && minutes > 1) {
    return `${hours} hr ${minutes} mins`;
  } else if (hours === 0 && minutes > 1) {
    return `${minutes} mins`;
  } else if (hours === 0 && minutes === 1) {
    return `${minutes} min`;
  } else if (hours === 1 && minutes === 0) {
    return `${hours} hr`;
  } else if (hours > 1 && minutes === 0) {
    return `${hours} hrs`;
  } else {
    return `${minutes} mins`;
  }
};
