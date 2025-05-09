import type { DropdownOption } from '@mavericks/types';
import { MCCData } from '@mavericks/types';
import { z } from 'zod';

const GetMCCSubcategoriesInputSchema = z.object({
  category: z.string().nullable(),
});

export type GetMCCSubcategoriesInput = z.infer<
  typeof GetMCCSubcategoriesInputSchema
>;

export const getMCCSubcategories = (
  input: GetMCCSubcategoriesInput
): DropdownOption[] => {
  const { category } = GetMCCSubcategoriesInputSchema.parse(input);

  if (!category) return [];

  const data = Object.values(MCCData)
    .filter((row) => row.baseCategory === category)
    .map((d) => ({ label: d.description, value: d.description }));

  return data;
};
