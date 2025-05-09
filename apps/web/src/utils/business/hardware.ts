import type { Business } from '@mavericks/types';

import { APIFieldKey } from '@/common-types/form';

export const parseHardware = (
  data: Map<string, string | null>
): Business['selectedDevices'] => {
  const selectedDevice = {
    device: data.get(APIFieldKey.businessHardwareEquipmentName) ?? '',
    quantity: data.get(APIFieldKey.businessHardwareEquipmentQuantity) ?? '',
    price: data.get(APIFieldKey.businessHardwareEquipmentPrice) ?? '',
  };

  return { [selectedDevice.device]: selectedDevice.quantity };
};
