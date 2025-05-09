import { useRegisterBusinessStore } from '@mavericks/store';
import type { Business } from '@mavericks/types';
import {
  MIN_REQUIRED_OWNERSHIP_PERCENTAGE,
  OwnerIndex,
} from '@mavericks/types';
import { useMemo } from 'react';

type UseOwnersData = {
  totalOwnership: number;
  isMinOwnershipMet: boolean;
  isOwnershipFull: boolean;
  nextOwnerSlot: OwnerIndex | null;
  ownerCount: number;
  remainingAssignableOwnership: number;
};

export const findNextOwnerSlot = (
  owners: Business['owners']
): OwnerIndex | null => {
  return (
    Object.values(OwnerIndex).find((index) => owners[index] === null) ?? null
  );
};

export const useOwnersData = (forOwner?: OwnerIndex): UseOwnersData => {
  const owners = useRegisterBusinessStore((s) => s.business.owners);

  const remainingAssignableOwnership = useMemo(() => {
    return Object.entries(owners)
      .filter(([i]) => forOwner !== (i as OwnerIndex))
      .reduce(
        (sum, [, owner]) => sum + Number(owner?.ownershipPercentage ?? 0),
        0
      );
  }, [forOwner, owners]);

  // Calculate total assigned ownership percentage
  const totalOwnership = useMemo(() => {
    return Object.entries(owners).reduce(
      (sum, [, owner]) => sum + Number(owner?.ownershipPercentage ?? 0),
      0
    );
  }, [owners]);

  const isMinOwnershipMet = totalOwnership >= MIN_REQUIRED_OWNERSHIP_PERCENTAGE;
  const isOwnershipFull = totalOwnership === 100;

  const nextOwnerSlot = findNextOwnerSlot(owners);

  const ownerCount = Object.values(owners).filter(
    (owner) => owner !== null
  ).length;

  return {
    totalOwnership,
    isMinOwnershipMet,
    isOwnershipFull,
    nextOwnerSlot,
    ownerCount,
    remainingAssignableOwnership,
  };
};
