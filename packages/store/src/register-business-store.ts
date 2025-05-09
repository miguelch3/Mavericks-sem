import type {
  Business,
  BusinessOwner,
  ClientFormError,
  OwnerIndex,
} from '@mavericks/types';
import {
  FormsWithProgressBar,
  INITIAL_PROGRESS_BAR_VALUE,
} from '@mavericks/types';
import { create } from 'zustand';

type RegisterBusinessStoreType = {
  business: Business;
  phone: string;
  agreementUrl: string;
  progress: number;
  error: ClientFormError | null;

  // TODO: move this
  primaryColor: string;
  primaryColorTmp: string;
  secondaryColor: string;
  logoUrl: string;
  companyName: string;
  setCompanyName: (name: string) => void; // Add the missing setCompanyName property

  // contract
  contractUrl: string;
  signatureId: string;
};

type RegisterBusinessActionType = {
  addInformation: (data: Partial<Business>) => void;
  addOwner: (owner: BusinessOwner, index: OwnerIndex) => void;
  setPhone: (phone: string) => void;
  setAgreementUrl: (url: string) => void;
  incrementProgress: () => void;
  decrementProgress: () => void;
  calculateCurrentProgress: (step: number) => void;
  editOwner: (index: OwnerIndex, owner: BusinessOwner) => void;
  deleteOwner: (index: OwnerIndex) => void;

  setError: (e: ClientFormError | null) => void;

  clear: () => void;

  // TODO: move this
  setPrimaryColor: (color: string) => void;
  setPrimaryColorTmp: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setLogoUrl: (logo: string) => void;
  setCompanyName: (name: string) => void; // Specify the type of the name parameter

  // contract
  setContractUrl: (url: string) => void;
  setSignatureId: (id: string) => void;
};

export const useRegisterBusinessStore = create<
  RegisterBusinessStoreType & RegisterBusinessActionType
>((set) => ({
  business: {} as Business, // We need a completely empty object to start without pre-filling fields
  phone: '',
  agreementUrl: '',
  progress: INITIAL_PROGRESS_BAR_VALUE,
  error: null,

  // TODO: move this
  primaryColor: 'rgb(55, 73, 117)',
  primaryColorTmp: 'rgb(55, 73, 117)',
  secondaryColor: 'rgb(241, 245, 249)',
  logoUrl: './assets/company-logo.svg',
  companyName: 'Talus',

  // contract
  contractUrl: '',
  signatureId: '',

  addInformation: (data): void =>
    set((state) => ({ business: { ...state.business, ...data } })),
  addOwner: (owner, index): void =>
    set((state) => {
      return {
        business: {
          ...state.business,
          owners: {
            ...state.business?.owners,
            [index]: owner,
          },
        },
      };
    }),

  editOwner: (index, owner): void =>
    set((state) => {
      return {
        business: {
          ...state.business,
          owners: {
            ...state.business?.owners,
            [index]: owner,
          },
        },
      };
    }),

  deleteOwner: (index): void =>
    set((state) => ({
      business: {
        ...state.business,
        owners: {
          ...state.business?.owners,
          [index]: null, // Delete owner at the specified index
        },
      },
    })),

  setError: (error): void => set({ error }),

  setPhone: (phone): void => set({ phone }),
  setAgreementUrl: (agreementUrl): void => set({ agreementUrl }),

  incrementProgress: (): void =>
    set((state) => ({
      progress: state.progress + 100 / FormsWithProgressBar.length,
    })),
  decrementProgress: (): void =>
    set((state) => ({
      progress: state.progress - 100 / FormsWithProgressBar.length,
    })),

  calculateCurrentProgress: (step: number): void => {
    // Check how many steps before the current one are included in the progress
    const currentStepIndex = FormsWithProgressBar.findIndex((s) => s === step);

    // If the step is not in formsWithProgressBar, return the previous progress
    if (currentStepIndex === -1) {
      const totalSteps = FormsWithProgressBar.length;
      const calculatedStep =
        (100 / totalSteps) * (FormsWithProgressBar.length - 1);
      set({ progress: calculatedStep });
    }

    // Calculate progress as percentage of steps with progress bar
    const totalSteps = FormsWithProgressBar.length;
    const progress =
      (100 / totalSteps) * currentStepIndex + INITIAL_PROGRESS_BAR_VALUE;
    set({ progress });
  },

  clear: (): void =>
    set({
      error: null,
      business: {} as Business,
      phone: '',
      agreementUrl: '',
      progress: INITIAL_PROGRESS_BAR_VALUE,
    }),

  // TODO: move this
  setPrimaryColor: (color): void => set({ primaryColor: color }),
  setPrimaryColorTmp: (color): void => set({ primaryColorTmp: color }),
  setSecondaryColor: (color): void => set({ secondaryColor: color }),
  setLogoUrl: (logoUrl): void => set({ logoUrl }),
  setCompanyName: (name): void => set({ companyName: name }), // Specify the type of the name parameter

  // contract
  setContractUrl: (url): void => set({ contractUrl: url }),
  setSignatureId: (id): void => set({ signatureId: id }),
}));
