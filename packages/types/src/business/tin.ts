import { isValidEIN, isValidITIN, isValidTIN } from '@mavericks/shared';
import { z } from 'zod';

export enum TINOption {
  EIN = 'EIN',
  SSN = 'SSN',
  ITIN = 'ITIN',
}

export const TINSchema = z
  .object({
    selectedTin: z.nativeEnum(TINOption, {
      message: 'validation:tin_type_required',
    }),
    tin: z.string({ message: 'validation:tin_required' }).trim(),
  })
  .refine(
    (data) => {
      const { selectedTin, tin } = data;

      if (selectedTin === TINOption.EIN) return isValidEIN(tin);
      if (selectedTin === TINOption.ITIN) return isValidITIN(tin);
      return isValidTIN(tin);
    },
    {
      message: 'validation:tin_invalid',
      path: ['tin'],
    }
  );

export type BusinessTIN = z.infer<typeof TINSchema>;
