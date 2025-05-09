import type { z, ZodSchema } from 'zod';

import { BusinessOwnerSchema } from '@/types/business/owner';
import type { OwnerIndex } from '@/types/iris';

export const OwnerInformationSchema = (totalOwnership: number): ZodSchema =>
  BusinessOwnerSchema.refine(
    (val) => val.ownershipPercentage <= 100 - totalOwnership,
    {
      message: 'validation:ownership_exceeds_current',
      path: ['ownershipPercentage'],
    }
  );

export type OwnerInformationFields = z.infer<typeof BusinessOwnerSchema>;

export type EditingOwnerData = {
  owner: OwnerInformationFields | null;
  index: OwnerIndex;
};
