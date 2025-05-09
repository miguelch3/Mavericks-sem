import { businessTypes } from '@/api-hooks/utils/business-types';

export const getBusinessTypeList = (): Array<{
  label: string;
  value: string;
}> => {
  // TODO: Enable when IRIS get list fixed
  // const data = await axios.get<APIOptions>({
  //   url: APIEndpoints.GET_LEAD_FIELD_OPTIONS,
  //   urlParams: { id: APIFieldKey.businessType },
  // });

  // // filter out the data that value is empty string
  // data.dropdown = data.dropdown.filter(({ value }) => value !== '');

  return businessTypes.map(({ value, key }) => ({
    label: value,
    value: key,
  }));
};
