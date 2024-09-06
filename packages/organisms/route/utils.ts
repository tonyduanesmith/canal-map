const LOCK_OPERATION_IN_MINUTES = 20;

export const getLockOperationDurationInMinutes = (numberOfLocks: number): number =>
  numberOfLocks * LOCK_OPERATION_IN_MINUTES;
