import { useSetOwnerInformationMutation } from '@mavericks/api-hooks';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { OwnerIndex, OwnerInformationFields } from '@mavericks/types';
import useTranslation from 'next-translate/useTranslation';
import type { SubmitHandler } from 'react-hook-form';

import type { StepFormComponentType } from '@/common-types/form';
import { clientConfig as config } from '@/config/client';

import { OwnerInformationForm } from './owner-information-form';

type Props = {
  owner: OwnerInformationFields;
  index: OwnerIndex;
};

export const EditOwnerForm: StepFormComponentType<Props> = ({
  owner,
  index,
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const editOwner = useRegisterBusinessStore((s) => s.editOwner);

  const { mutateAsync: setOwner, isPending } = useSetOwnerInformationMutation();

  const onSubmit: SubmitHandler<OwnerInformationFields> = async (data) => {
    if (!config.demo.active) {
      await setOwner({
        ...data,
        ownerIndex: index,
      });
    }

    editOwner(index, data);
    toNextStep();
  };

  const addOwnerTitle = t('add-another-owner-title');
  const addOwnerSubtitle = t('add-another-owner-subtitle');

  return (
    <OwnerInformationForm
      title={addOwnerTitle}
      subtitle={addOwnerSubtitle}
      owner={owner}
      onSubmitOwner={onSubmit}
      isLoading={isPending}
      toNextStep={toNextStep}
      toPreviousStep={toPreviousStep}
      index={index}
    />
  );
};
