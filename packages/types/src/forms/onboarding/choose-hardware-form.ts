import type { z } from 'zod';

import { BusinessSchema } from '@/types/business/business';

export const ChooseHardwareFormSchema = BusinessSchema.pick({
  selectedDevices: true,
});

export type ChooseHardwareFields = z.infer<typeof ChooseHardwareFormSchema>;

export enum HardwareName {
  DEJAVOO_QD3 = 'Dejavoo QD3',
}
