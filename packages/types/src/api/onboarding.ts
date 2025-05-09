export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  APPROVED = 'APPROVED',
}

export const OnboardingCompletedStatuses: OnboardingStatus[] = [
  OnboardingStatus.COMPLETED,
  OnboardingStatus.APPROVED,
];
