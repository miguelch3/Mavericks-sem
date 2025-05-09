import { useSetOwnerInformationMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { OwnerInformationFields } from '@mavericks/types';
import { OwnerIndex } from '@mavericks/types';
import useTranslation from 'next-translate/useTranslation';
import type { SubmitHandler } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { clientConfig as config } from '@/config/client';

import { OwnerInformationForm } from './owner-information-form';

type Props = {
  index?: OwnerIndex;
};

export const AddOwnerForm: StepFormComponentType<Props> = ({
  index,
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const mainOwner = useRegisterBusinessStore((s) => s.business.mainOwner);
  const contactEmail = useRegisterBusinessStore((s) => s.business.contactEmail);
  const addOwner = useRegisterBusinessStore((s) => s.addOwner);
  const addInformation = useRegisterBusinessStore((s) => s.addInformation);

  const initialData = index
    ? null
    : {
        ...mainOwner,
        email: mainOwner?.email || contactEmail,
      };

  const { mutateAsync: setOwner, isPending } = useSetOwnerInformationMutation();

  const ownerIndex = index || OwnerIndex.One;

  const onSubmit: SubmitHandler<OwnerInformationFields> = async (data) => {
    if (!config.demo.active) {
      await setOwner({
        ...data,
        ownerIndex,
      });
    }

    // No index given means we are filling representative (Owner One)
    if (!index) {
      addInformation({ mainOwner: data });
    }

    addOwner(data, ownerIndex);

    toNextStep();
  };

  const addOwnerTitle = index ? t('add-another-owner-title') : undefined;
  const addOwnerSubtitle = index ? t('add-another-owner-subtitle') : undefined;

  return (
    <OwnerInformationForm
      title={addOwnerTitle}
      subtitle={addOwnerSubtitle}
      owner={initialData}
      onSubmitOwner={onSubmit}
      isLoading={isPending}
      toNextStep={toNextStep}
      toPreviousStep={toPreviousStep}
      index={ownerIndex}
    />
  );
};
