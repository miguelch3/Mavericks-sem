import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export function calculateYearsInBusiness(establishedDate: Dayjs): number {
  const currentYear = dayjs().year();
  const establishedYear = establishedDate.year();

  return currentYear - establishedYear;
}
