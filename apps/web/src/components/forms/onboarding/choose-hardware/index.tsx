import { zodResolver } from '@hookform/resolvers/zod';
import {
  useGenerateMpaContractMutation,
  useSetHardwareMutation,
} from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { ChooseHardwareFields } from '@mavericks/types';
import { ChooseHardwareFormSchema, HardwareName } from '@mavericks/types';
import { Flex } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { HardwareOptionCard } from '@/components/cards/hardware-option-card';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';

// TODO: Handle with API
const availableDevices = [
  {
    name: 'Dejavoo QD3',
    description:
      'Perfect for on the go businesses that need to make transactions on the go, quickly and efficiently.',
    price: '(This device is included in your monthly service fee)',
  },
];

const ChooseHardwareForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const { mutateAsync: setHardware, isPending: isHardwareLoading } =
    useSetHardwareMutation();

  const { mutateAsync: generateContract, isPending: isAgreementLoading } =
    useGenerateMpaContractMutation();

  const [error, setError] = useState<unknown>(null);

  const setContractUrl = useRegisterBusinessStore((s) => s.setContractUrl);
  const setSignatureId = useRegisterBusinessStore((s) => s.setSignatureId);

  const addInformation = useRegisterBusinessStore((s) => s.addInformation);
  const preSelectedDevices = useRegisterBusinessStore(
    (s) => s.business.selectedDevices
  );

  const isThereAnyPreselectedDevice = preSelectedDevices
    ? Object.keys(preSelectedDevices).filter((k) => !!k).length > 0 // Sometimes keys are empty strings, so we need to filter
    : false;

  const devices = isThereAnyPreselectedDevice
    ? preSelectedDevices
    : {
        [HardwareName.DEJAVOO_QD3]: '0',
      };

  const form = useForm<ChooseHardwareFields>({
    mode: config.app.form.validationMode,
    resolver: zodResolver(ChooseHardwareFormSchema),
    defaultValues: { selectedDevices: devices },
  });
  const { handleSubmit, watch, control } = form;

  const selectedDevices = watch('selectedDevices');
  const onDeviceChange = (value: Record<string, string>): void => {
    form.setValue('selectedDevices', { ...selectedDevices, ...value });
  };

  const onSubmit: SubmitHandler<ChooseHardwareFields> = async (data) => {
    try {
      const qd3Quantity = data.selectedDevices[HardwareName.DEJAVOO_QD3];

      if (!qd3Quantity) {
        form.setError('selectedDevices', {
          message: 'Please select at least one device',
        });
        return;
      }

      if (!config.demo.active) {
        await setHardware({
          device: HardwareName.DEJAVOO_QD3,
          quantity: qd3Quantity,
          price: config.data.hardwarePrice,
        });
      }

      const { contract_url: url, lead_signature_id: signId } =
        await generateContract();

      setContractUrl(url);
      setSignatureId(signId);

      addInformation({ selectedDevices });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  // Labels
  const title = t('choose-hardware-title');
  // const subtitle = t('choose-hardware-subtitle');

  const isLoading = isAgreementLoading || isHardwareLoading;

  return (
    <OnboardingFormWrapper<ChooseHardwareFields>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle=""
      loading={isLoading}
      error={error}
    >
      <div>
        <Controller
          name="selectedDevices"
          control={control}
          render={({ field }): JSX.Element => (
            <Flex vertical>
              {availableDevices.map((device) => (
                <HardwareOptionCard
                  {...field}
                  key={device.name}
                  name={device.name}
                  description={device.description}
                  pricing={device.price}
                  onChange={onDeviceChange}
                />
              ))}
            </Flex>
          )}
        />
      </div>
    </OnboardingFormWrapper>
  );
};

export default ChooseHardwareForm;
