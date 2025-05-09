import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import { FormsWithProgressBar } from '@mavericks/types';
import type { FC } from 'react';
import { useState } from 'react';
import Confetti from 'react-confetti';

import { lazyStepForms, MAX_STEPS } from '@/utils/lazy-step-forms';

export const FormHandler: FC = () => {
  const sessionStore = useSessionStore();

  const incrementProgressBar = useRegisterBusinessStore(
    (s) => s.incrementProgress
  );
  const decrementProgressBar = useRegisterBusinessStore(
    (s) => s.decrementProgress
  );

  const [completed, setCompleted] = useState<boolean>(false);

  const Component = lazyStepForms[sessionStore.step];

  const handleNextStep = (): void => {
    const { step, setStep } = sessionStore;

    const nextStep = step + 1;
    if (nextStep <= MAX_STEPS) setStep(nextStep);
    if (nextStep === MAX_STEPS) setCompleted(true);

    if (FormsWithProgressBar.includes(step)) incrementProgressBar();
  };

  const handlePreviousStep = (): void => {
    const { step, setStep } = sessionStore;
    const previous = step - 1;
    if (previous >= 1) setStep(previous);

    if (FormsWithProgressBar.includes(step)) decrementProgressBar();
  };

  return Component ? (
    <>
      <Component
        toNextStep={handleNextStep}
        toPreviousStep={handlePreviousStep}
      />

      {(completed || sessionStore.step === MAX_STEPS) && (
        <Confetti
          numberOfPieces={400}
          className="confetti"
          recycle={false}
          tweenDuration={10000}
        />
      )}
    </>
  ) : null;
};
