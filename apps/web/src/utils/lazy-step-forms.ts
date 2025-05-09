import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

import type { StepFormProps } from '@/common-types/form';

export const lazyStepForms: Record<
  number,
  ComponentType<object & StepFormProps>
> = {
  1: dynamic(() => import('@/components/forms/onboarding/phone-sign-in')),
  2: dynamic(() => import('@/components/forms/onboarding/verify-otp')),
  3: dynamic(() => import('@/components/forms/onboarding/business-type')),
  4: dynamic(
    () => import('@/components/forms/onboarding/business-basic-information')
  ),
  5: dynamic(() => import('@/components/forms/onboarding/owner-information')),
  6: dynamic(() => import('@/components/forms/onboarding/owners-overall')),
  7: dynamic(() => import('@/components/forms/onboarding/what-do-you-sell')),
  8: dynamic(() => import('@/components/forms/onboarding/current-sales')),
  9: dynamic(() => import('@/components/forms/onboarding/bank-information')),
  10: dynamic(
    () => import('@/components/forms/onboarding/review-your-details')
  ),
  11: dynamic(() => import('@/components/forms/onboarding/choose-hardware')),
  12: dynamic(() => import('@/components/forms/onboarding/sign-mpa')),
  13: dynamic(() => import('@/components/forms/onboarding/you-are-all-set')),
};

export const MAX_STEPS = Object.keys(lazyStepForms).length;
