import { zodResolver } from '@hookform/resolvers/zod';
import { useSetBusinessBasicInfoMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { BusinessBasicInformationFieldsType } from '@mavericks/types';
import { BusinessBasicInformationFieldsSchema } from '@mavericks/types';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';
import { calculateYearsInBusiness } from '@/utils/date';

import { BusinessOtherFields } from './business-other-fields';
import { ContactInfoInputs } from './contact-info-inputs';
import { BusinessLegalDataInputs } from './legal-data-inputs';
import { TINInputs } from './tin-inputs';

const BusinessInformationForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const { mutateAsync: setBasicInformation, isPending } =
    useSetBusinessBasicInfoMutation();

  const addInformation = useRegisterBusinessStore((s) => s.addInformation);
  const business = useRegisterBusinessStore((s) => s.business);

  const [error, setError] = useState<unknown>(null);

  const form = useForm<BusinessBasicInformationFieldsType>({
    mode: config.app.form.validationMode,
    defaultValues: {
      ...business,
      tinData: {
        ...business.tinData,
        selectedTin: business.tinData.selectedTin || undefined,
      },
      legalAddress: {
        ...business.legalAddress,
        address: {
          ...business.legalAddress.address,
          state: business.legalAddress.address.state || undefined,
        },
      },
    },
    resolver: zodResolver(BusinessBasicInformationFieldsSchema),
  });
  const { control, handleSubmit, watch } = form;

  const onSubmit: SubmitHandler<BusinessBasicInformationFieldsType> = async (
    data
  ) => {
    try {
      const businessEstablishedDate = data.businessEstablishedDate.set('D', 1);
      const yearsInBusiness = calculateYearsInBusiness(businessEstablishedDate);

      if (!config.demo.active) {
        await setBasicInformation({
          ...data,
          yearsInBusiness,
        });
      }

      addInformation({
        ...data,
      });
      toNextStep();
    } catch (e) {
      setError(e);
    }
  };

  const dbaAddressRequired = watch('dbaAddress.isRequired');
  useEffect(() => {
    // We need to clear the object as its composed and will be required even if 'address' is {}
    if (!dbaAddressRequired) form.setValue('dbaAddress', { isRequired: false });
  }, [dbaAddressRequired, form]);

  const businessPhoneRequired = watch('businessPhone.isRequired');
  useEffect(() => {
    if (!businessPhoneRequired) {
      form.setValue('businessPhone', { isRequired: false });
    }
  }, [businessPhoneRequired, form]);

  // Labels
  const title = t('tell-us-about-your-business-title');
  const subtitle = t('tell-us-about-your-business-subtitle');

  const loading = isPending;

  return (
    <OnboardingFormWrapper<BusinessBasicInformationFieldsType>
      form={form}
      onSubmit={handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      loading={loading}
      error={error}
    >
      <InputsWrapper>
        <BusinessLegalDataInputs form={form} disabled={loading} />

        <TINInputs form={form} disabled={loading} />

        <BusinessOtherFields form={form} disabled={loading} />

        <ContactInfoInputs control={control} disabled={loading} />
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default BusinessInformationForm;
