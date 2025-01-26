import { differenceInYears, parse } from "date-fns";

export const isUserAtLeast18YearsOld = (birthDate: string): boolean => {
  const parsedBirthDate = parse(birthDate, 'dd/MM/yyyy', new Date());
  const today = new Date();
  const age = differenceInYears(today, parsedBirthDate);
  return age >= 18;
};