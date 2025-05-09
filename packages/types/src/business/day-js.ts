import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { z } from 'zod';

export const zodDay = z.custom<Dayjs>(
  (val) => dayjs.isDayjs(val) && val.isValid(),
  {
    message: 'validation:invalid_date',
  }
);
