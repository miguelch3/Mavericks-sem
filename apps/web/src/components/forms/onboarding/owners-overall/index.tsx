import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { useRegisterBusinessStore } from '@mavericks/store';
import type { Business, EditingOwnerData } from '@mavericks/types';
import {
  APIErrorCode,
  ClientFormError,
  MIN_REQUIRED_OWNERSHIP_PERCENTAGE,
  OwnerIndex,
} from '@mavericks/types';
import { Button } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useClearOwnerInformationMutation } from '@/api-hooks/onboarding';
import type { StepFormComponentType } from '@/common-types/form';
import { BusinessOwnerCard } from '@/components/cards/business-owner-card';
import { InputsWrapper } from '@/components/forms/onboarding/inputs-wrapper';
import { AddOwnerForm } from '@/components/forms/onboarding/owner-information/add-owner';
import { EditOwnerForm } from '@/components/forms/onboarding/owner-information/edit-owner';
import { OnboardingFormWrapper } from '@/components/onboarding-form-wrapper';
import { clientConfig as config } from '@/config/client';
import { useOwnersData } from '@/hooks/use-owners-data';

export const findNextAvailableOwnerIndex = (
  owners: Business['owners']
): OwnerIndex | null => {
  return (
    Object.values(OwnerIndex).find((index) => owners[index] === null) ?? null
  );
};

const BusinessOwnersForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  const { t } = useTranslation('registration');

  const form = useForm({
    mode: config.app.form.validationMode,
  });

  const mainOwner = useRegisterBusinessStore((s) => s.business.mainOwner);
  const owners = useRegisterBusinessStore((s) => s.business.owners);
  const deleteOwner = useRegisterBusinessStore((s) => s.deleteOwner);

  const { isMinOwnershipMet, isOwnershipFull, nextOwnerSlot, ownerCount } =
    useOwnersData();

  const { mutateAsync: clearOwnerData, isPending } =
    useClearOwnerInformationMutation();

  const [error, setError] = useState<ClientFormError | null>(null);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [ownerOnEdit, setOwnerOnEdit] = useState<EditingOwnerData | null>(null);

  const onSubmit = (): void => {
    toNextStep();
  };

  // Handlers
  const onAddOwner = (): void => {
    if (nextOwnerSlot) {
      setIsAdding(true);
    }
  };

  const onEditOwner = (index: OwnerIndex): void => {
    setOwnerOnEdit({
      owner: owners[index] || null,
      index,
    });
  };

  const onDeleteOwner = async (index: OwnerIndex): Promise<void> => {
    await clearOwnerData({ ownerIndex: index });
    deleteOwner(index);
  };

  // Labels
  const title = t('business-owners-title');
  const subtitle = t('business-owners-subtitle', {
    percent: MIN_REQUIRED_OWNERSHIP_PERCENTAGE,
  });

  const ownersLabel = t('common:owners');

  const doneContinueButtonLabel = t('inputs:done-continue-label');
  const addAnotherOwnerLabel = t('inputs:add-another-owner-label');

  // Main Owner Name
  const { firstName, lastName, middleName } = mainOwner.name;
  const mainOwnerFullName =
    `${firstName} ${middleName ?? ''} ${lastName}`.trim();

  useEffect(() => {
    if (!isMinOwnershipMet) {
      const params = { percent: MIN_REQUIRED_OWNERSHIP_PERCENTAGE };
      setError(
        new ClientFormError(
          APIErrorCode.OWNERS_OWNERSHIP_REQUIRED_PERCENTAGE_NOT_MEET,
          'info',
          params
        )
      );
    } else {
      setError(null);
    }
  }, [isMinOwnershipMet, setError, t]);

  if (ownerOnEdit && ownerOnEdit.owner) {
    return (
      <EditOwnerForm
        owner={ownerOnEdit.owner}
        index={ownerOnEdit.index}
        toNextStep={(): void => setOwnerOnEdit(null)}
        toPreviousStep={(): void => setOwnerOnEdit(null)}
      />
    );
  }

  if (isAdding && nextOwnerSlot) {
    return (
      <AddOwnerForm
        index={nextOwnerSlot}
        toNextStep={(): void => setIsAdding(false)}
        toPreviousStep={(): void => setIsAdding(false)}
      />
    );
  }

  return (
    <OnboardingFormWrapper
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      onGoBack={toPreviousStep}
      title={title}
      subtitle={subtitle}
      disabled={!isMinOwnershipMet}
      buttonLabel={doneContinueButtonLabel}
      loading={isPending}
      error={error}
      buttonAtEnd
    >
      <InputsWrapper>
        <div className="min-h-64">
          <label className="text-sm text-primary">{ownersLabel}</label>

          {mainOwner && (
            <div key={`${mainOwner.email}-card`}>
              <BusinessOwnerCard
                index={OwnerIndex.One}
                name={mainOwnerFullName}
                email={mainOwner.email}
                ownershipPercentage={mainOwner.ownershipPercentage}
                onEdit={toPreviousStep}
                onDelete={toPreviousStep}
                disabled={isPending}
              />
            </div>
          )}

          {owners &&
            Object.entries(owners).map(([key, owner]) => {
              const idx = key as OwnerIndex; // Safe to cast
              if (!owner || idx === OwnerIndex.One) return null; // Owner data not available or its main owner

              const {
                firstName: ownerFirstName,
                lastName: ownerLastName,
                middleName: ownerMiddleName,
              } = owner.name || {};
              const ownerFullName =
                `${ownerFirstName} ${ownerMiddleName ?? ''} ${ownerLastName}`.trim();

              return (
                <div key={key}>
                  <BusinessOwnerCard
                    index={idx}
                    name={ownerFullName}
                    email={owner.email}
                    ownershipPercentage={owner.ownershipPercentage}
                    onEdit={(): void => onEditOwner(key as OwnerIndex)}
                    onDelete={async (): Promise<void> => {
                      await onDeleteOwner(key as OwnerIndex);
                    }}
                    disabled={isPending}
                  />
                </div>
              );
            })}

          {!isOwnershipFull && ownerCount < Object.keys(OwnerIndex).length && (
            <Button
              data-cy="add-owner-button"
              type="primary"
              className="w-full"
              size="large"
              onClick={onAddOwner}
              icon={<PlusOutlined className="self-center text-sm" />}
              loading={isPending}
            >
              {addAnotherOwnerLabel}
            </Button>
          )}
        </div>
      </InputsWrapper>
    </OnboardingFormWrapper>
  );
};

export default BusinessOwnersForm;
