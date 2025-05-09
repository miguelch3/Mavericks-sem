import type { FC } from 'react';

import { CloverAddOnsSection } from '@/components/services-fees/sections/clover-add-ons-section';
import { GatewaySection } from '@/components/services-fees/sections/gateway-section';
import { HardwareSection } from '@/components/services-fees/sections/hardware-section';
import { ServiceFeeSection } from '@/components/services-fees/sections/service-fee-section';

// Service fee item mock (will be moved to a data service later)
const serviceFeeItem = {
  title: 'Monthly Service Fee',
  description: 'Some info about the service fee',
  price: '$59.99',
  priceLabel: 'Per Month',
};

// Hardware data mock (will be moved to a data service later)
const hardwareData = [
  {
    id: 'terminal-1',
    title: 'Terminal 1 : Dejavoo QD3',
    qty: 2,
    price: '$299',
    description:
      'Payment Terms : Rental, Charge To : Purchaser, Purchase Method: ACH, Deployment Fee: $29, Purchase Total: $627',
    priceLabel: 'Per Month',
  },
  {
    id: 'terminal-2',
    title: 'Terminal 2 Dejavoo QD3',
    qty: 2,
    price: '$299',
    description:
      'Payment Terms : Rental, Charge To : Purchaser, Purchase Method: ACH, Deployment Fee: $29, Purchase Total: $627',
    priceLabel: 'Per Month',
  },
  {
    id: 'terminal-3',
    title: 'Terminal 3 : Dejavoo QD3',
    qty: 2,
    price: '$299',
    description:
      'Payment Terms : Rental, Charge To : Purchaser, Purchase Method: ACH, Deployment Fee: $29, Purchase Total: $627',
    priceLabel: 'Per Month',
  },
  {
    id: 'hardware-payment',
    title: 'Hardware Payment Details',
    qty: 2,
    price: '$299',
    description:
      'Payment Terms : Rental, Charge To : Purchaser, Purchase Method: ACH, Deployment Fee: $29, Purchase Total: $627',
    priceLabel: 'Per Month',
  },
];

// Clover add-ons data mock (will be moved to a data service later)
const cloverAddOnsData = [
  {
    id: 'sp742-kitchen-printer',
    title: 'SP742 Kitchen Printer',
    qty: 1,
    price: '$99',
    description:
      'Payment Terms : Rental, Charge To : Purchaser, Purchase Method: ACH, Deployment Fee: $29, Purchase Total: $627',
    priceLabel: 'One Time',
  },
];

// Gateway data mock (will be moved to a data service later)
const gatewayData = [
  {
    id: 'talus-connect',
    title: 'Talus Connect',
    description: 'Setup Fee: $29.99, Monthly Fee: $99, Transaction Fee: $0.05',
  },
];

export const ServiceFeesCard: FC = () => {
  return (
    <div className="rounded-lg border-4 border-gray-100 px-4 py-2">
      <ServiceFeeSection serviceFeeItem={serviceFeeItem} />
      <HardwareSection hardwareData={hardwareData} />
      <CloverAddOnsSection cloverAddOnsData={cloverAddOnsData} />
      <GatewaySection gatewayData={gatewayData} />
    </div>
  );
};
