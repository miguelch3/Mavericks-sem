import { AppEnvironment } from '@mavericks/types';
import { z } from 'zod';

import { config } from '@/api-hooks/config/client';
import { axios } from '@/api-hooks/utils/axios';
import { APIFieldKey } from '@/api-hooks/utils/form-fields';

const SetHardwareSchema = z.object({
  device: z.string(),
  quantity: z.string(),
  price: z.string(),
});

export type SetHardwareInput = z.infer<typeof SetHardwareSchema>;

export const setHardware = async (input: SetHardwareInput): Promise<void> => {
  const { quantity } = input;

  if (quantity === '0') {
    await axios.patchIrisData({
      payload: {
        fields: [
          {
            id: APIFieldKey.equipmentTemplateOne,
            value: config.app.env === AppEnvironment.PRODUCTION ? '3' : '2',
          },
          {
            id: APIFieldKey.gateway,
            value: '14',
          },
          {
            id: APIFieldKey.processorSelection,
            value: config.app.env === AppEnvironment.PRODUCTION ? '2' : '1',
          },
          {
            id: APIFieldKey.pricingModel,
            value: config.data.pricingModel,
          },
          {
            id: APIFieldKey.twoTierPricing,
            value: '1',
          },
          // Clear fields if there was a previous selection
          {
            id: APIFieldKey.equipmentTemplateTwo,
            value: '',
          },
          {
            id: APIFieldKey.businessHardwareEquipmentName,
            value: '',
          },
          {
            id: APIFieldKey.businessHardwareEquipmentQuantity,
            value: '',
          },
          {
            id: APIFieldKey.businessHardwareEquipmentPrice,
            value: '',
          },
          {
            id: APIFieldKey.pinDebit,
            value: '1',
          },
        ],
      },
    });

    return;
  }

  await axios.patchIrisData({
    payload: {
      fields: [
        {
          id: APIFieldKey.businessHardwareEquipmentName,
          value: config.data.hardwareID,
        },
        {
          id: APIFieldKey.businessHardwareEquipmentQuantity,
          value: quantity,
        },
        {
          id: APIFieldKey.processorSelection,
          value: config.app.env === AppEnvironment.PRODUCTION ? '2' : '1',
        },
        {
          id: APIFieldKey.pricingModel,
          value: config.data.pricingModel,
        },
        {
          id: APIFieldKey.twoTierPricing,
          value: '1',
        },
        {
          id: APIFieldKey.equipmentTemplateOne,
          value: config.app.env === AppEnvironment.PRODUCTION ? '3' : '2',
        },
        {
          id: APIFieldKey.equipmentTemplateTwo,
          value: config.app.env === AppEnvironment.PRODUCTION ? '2' : '1',
        },
        {
          id: APIFieldKey.gateway,
          value: '14',
        },
        {
          id: APIFieldKey.pinDebit,
          value: '1',
        },
      ],
    },
  });
};
