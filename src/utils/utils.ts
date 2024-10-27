export const addDaysWithCurrent = (oldDate: string, daysToAdd: number) => {
  const pastDate = new Date(oldDate);
  const newDate = new Date(pastDate);
  newDate.setDate(pastDate.getDate() + 7);
  return newDate;
};
