import type { StepFormComponentType } from '@/common-types/form';

import { AddOwnerForm } from './add-owner';

const RepresentativeOwnerForm: StepFormComponentType = ({
  toNextStep,
  toPreviousStep,
}) => {
  return (
    <AddOwnerForm toNextStep={toNextStep} toPreviousStep={toPreviousStep} />
  );
};

export default RepresentativeOwnerForm;
