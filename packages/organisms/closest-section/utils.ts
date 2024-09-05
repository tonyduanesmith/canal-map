export const removeLockPattern = (inputString: string): string => {
  // If the entire string matches the pattern "Lock [number]", return the original string.
  if (/^Lock \d+$/.test(inputString)) {
    return inputString;
  }

  // Otherwise, remove all instances of "Lock [number]" from the string.
  return inputString.replace(/Lock \d+,? ?/g, "").trim();
};
