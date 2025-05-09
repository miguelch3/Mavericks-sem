import type { APIOptions, DropdownOption } from '@mavericks/types';

import { axios } from '@/api-hooks/utils/axios';
import { APIEndpoints } from '@/api-hooks/utils/endpoints';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

export const getJobTitles = async (): Promise<DropdownOption[]> => {
  const data = await axios.get<APIOptions>({
    url: APIEndpoints.GET_LEAD_FIELD_OPTIONS,
    urlParams: { id: APIFieldKey.businessRepresentativeJobTitle },
  });

  return data.dropdown.map(({ value, key }) => ({
    label: value,
    value: key,
  }));
};
