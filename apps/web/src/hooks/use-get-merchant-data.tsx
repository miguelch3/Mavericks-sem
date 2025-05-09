import {
  useBusinessTypeList,
  useGetLeadQuery,
  useGetMerchant,
  useJobTitles,
} from '@mavericks/api-hooks';
import { useRegisterBusinessStore, useSessionStore } from '@mavericks/store';
import type {
  Business,
  BusinessFieldRow,
  BusinessOwner,
  OnboardingStatus,
  OwnerIndex,
} from '@mavericks/types';
import { OnboardingCompletedStatuses } from '@mavericks/types';
import { useState } from 'react';

import { parseApiFieldsDataToBusiness } from '@/utils/business/business';

type LoadArgs = {
  onError?: (e: unknown) => void;
};

type LoadLeadDataArgs = LoadArgs & {
  leadId?: number;
  status?: OnboardingStatus;
};

type UseGetMerchantDataType = {
  loadLeadData: (args?: LoadLeadDataArgs) => Promise<void>;
  isLoading: boolean;
  isInitialLoading: boolean;
};

export const useGetMerchantData = (): UseGetMerchantDataType => {
  const sessionStore = useSessionStore();
  const businessStore = useRegisterBusinessStore();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  const getMerchant = useGetMerchant({
    refetchOnWindowFocus: false,
    enabled: false, // Disable query to load automatically
    retry: false,
  });

  const getLead = useGetLeadQuery({
    refetchOnWindowFocus: false,
    enabled: false, // Disable query to load automatically
    retry: false,
  });

  const getBusinessTypes = useBusinessTypeList({
    refetchOnWindowFocus: false,
    enabled: false, // Disable query to load automatically
    retry: false,
  });

  const getJobTitles = useJobTitles({
    refetchOnWindowFocus: false,
    enabled: false, // Disable query to load automatically
    retry: false,
  });

  // Map type & owner job title as it comes as string and we need numeric value
  const mapBusinessInformation = async (
    fields: BusinessFieldRow[]
  ): Promise<Business> => {
    // Fetch business types & job titles
    const reqBusinessTypes = await getBusinessTypes.refetch();
    const reqJobTitles = await getJobTitles.refetch();

    const businessTypes = reqBusinessTypes.data ?? [];
    const jobTitles = reqJobTitles.data ?? [];

    // Parse fields data to business information
    const businessData = parseApiFieldsDataToBusiness(fields);

    // Find Numeric value for business type & job title
    const businessType = businessTypes.find(
      (type) => type.label === businessData.businessType
    );

    // Main owner
    const jobTitle = jobTitles.find(
      (title) => title.label === businessData.mainOwner?.jobTitle
    );

    const mainOwner = {
      ...businessData.mainOwner,
      jobTitle: jobTitle?.value || '',
    };

    // Other owners
    const newOwners = { ...businessData.owners };
    Object.entries(newOwners).forEach(([key, owner]) => {
      if (!owner) return;

      const ownerJobTitle = jobTitles.find(
        (title) => title.label === owner.jobTitle
      );

      newOwners[key as OwnerIndex] = {
        ...owner,
        jobTitle: ownerJobTitle?.value || '',
      };
    });

    return {
      ...businessData,
      mainOwner,
      businessType: String(businessType?.value ?? ''),
      owners: newOwners as BusinessOwner[],
    } as Business;
  };

  const clearData = (): void => {
    businessStore.clear();
    sessionStore.clear();
    sessionStore.setStep(1);
  };

  const getMerchantData = async (): Promise<{
    leadId: number | null;
    status: OnboardingStatus | null;
  }> => {
    const emptyRes = {
      leadId: null,
      status: null,
    };

    if (!sessionStore.token) {
      return emptyRes;
    }

    const merchant = await getMerchant.refetch();

    if (!merchant.data) {
      clearData();
      return emptyRes;
    }

    const { phone, ...data } = merchant.data;

    const leadId = data.lead_id;
    const status = data.lead_onboarding_status;

    businessStore.setPhone(phone.slice(1)); // We need to remove extra +1

    return { leadId, status };
  };

  const getLeadData = async (): Promise<void> => {
    const lead = await getLead.refetch();

    if (!lead.data) {
      clearData();
      return;
    }

    const flattedLeadData =
      lead.data.data.details.flatMap((e) => e.fields) ?? [];

    const business = await mapBusinessInformation(flattedLeadData);

    sessionStore.setLeadId(lead.data.lead_id.toString());
    businessStore.addInformation(business);
  };

  // Main function
  const loadLeadData: UseGetMerchantDataType['loadLeadData'] = async (
    args
  ): Promise<void> => {
    const { onError, leadId: argLeadId, status: argStatus } = args || {};

    setLoading(true);

    let leadId: number | null = argLeadId ?? null;
    let status: OnboardingStatus | null = argStatus ?? null;

    try {
      if (!leadId && !status) {
        const { leadId: merchantLeadId, status: merchantStatus } =
          await getMerchantData();
        leadId = merchantLeadId;
        status = merchantStatus;
      }

      if (status && OnboardingCompletedStatuses.includes(status)) {
        sessionStore.setStep(13);
        return;
      }

      // Invalid or null lead (No lead created)
      if (!leadId) {
        clearData();
        return;
      }

      // Fetch lead data (Lead still in progress)
      sessionStore.setLeadId(leadId.toString());
      await getLeadData();

      let { step } = sessionStore;

      // We set the step after auth if data was fetched (Skip steps 1 & 2 as we already have data & token)
      if (sessionStore.step < 3) step = 3;

      // We need to regenerate MPA if it's higher than 12 (Review step)
      if (sessionStore.step > 11) step = 11;

      // Update store data
      sessionStore.setStep(step);
      businessStore.calculateCurrentProgress(step);
    } catch (e) {
      businessStore.clear();
      sessionStore.clear();

      if (onError) {
        onError(e);
      }
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  return {
    loadLeadData,
    isLoading,
    isInitialLoading,
  };
};
