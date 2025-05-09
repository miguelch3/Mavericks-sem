import type { APIOptions } from '@mavericks/types';
import { stateCodes } from '@mavericks/types';

import { axios } from './axios';
import { APIEndpoints } from './endpoints';
import { APIFieldKey } from './form-fields';

export const getAddressStates = async (): Promise<APIOptions> => {
  return axios.get<APIOptions>({
    url: APIEndpoints.GET_LEAD_FIELD_OPTIONS,
    urlParams: { id: APIFieldKey.legalBusinessState },
  });
};

export const getIrisAddressStateValue = async (
  state: string
): Promise<string | null> => {
  const states = await getAddressStates();

  const code = stateCodes[state];
  const stateValue = states.dropdown
    .filter((o) => !!o.value)
    .find(({ value }) => value === code)?.key;

  return stateValue || null;
};
