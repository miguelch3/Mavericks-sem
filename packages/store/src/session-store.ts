import type { AttributionUrlOutput } from '@mavericks/types';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';

import { config } from '@/store/config/client';

const AUTH_COOKIE_NAME = 'auth_token';
const STEP_COOKIE_NAME = 'step';

const MAX_COOKIE_DAYS = 30;

type SessionStoreType = {
  token: string;
  merchantId: string;
  leadId: string;
  step: number;
  agentId: string;
  pbKey: string;

  othersSigning: boolean;

  attributionUrlData: AttributionUrlOutput | null;
};

type SessionActionsType = {
  saveAuth: (token: string) => void;
  setMerchantId: (merchantId: string) => void;
  setLeadId: (leadId: string) => void;
  setStep: (step: number) => void;
  setAgentId: (agentId: string) => void;
  setPbKey: (pbKey: string) => void;
  clear: () => void;
  clearCookies: () => void;

  setOthersSigning: (othersSigning: boolean) => void;
  setAttributionUrlData: (data: AttributionUrlOutput) => void;
};

const initializeStore = (): SessionStoreType => {
  const token = getCookie(AUTH_COOKIE_NAME) || '';
  const step = Number(getCookie(STEP_COOKIE_NAME) || 1) || 1;
  const merchantId = '';
  const leadId = '';
  const agentId = '';
  const pbKey = config.api.pbKey || '';

  return {
    token,
    merchantId,
    leadId,
    step,
    agentId,
    pbKey,
    othersSigning: false,
    attributionUrlData: null,
  };
};

const setCookieWithExpiration = (
  name: string,
  value: string | number
): void => {
  const date = new Date();
  date.setTime(date.getTime() + MAX_COOKIE_DAYS * 24 * 60 * 60 * 1000);

  setCookie(name, value, {
    expires: date,
  });
};

export const useSessionStore = create<SessionStoreType & SessionActionsType>(
  (set) => ({
    ...initializeStore(),

    setLeadId: (leadId): void => set({ leadId }),

    setMerchantId: (merchantId): void => set({ merchantId }),

    setStep: (step): void => {
      setCookieWithExpiration(STEP_COOKIE_NAME, step);
      set({ step });
    },

    saveAuth: (token): void => {
      setCookieWithExpiration(AUTH_COOKIE_NAME, token);
      set({ token });
    },

    setAgentId: (agentId): void => set({ agentId }),

    setPbKey: (pbKey): void => set({ pbKey }),

    setAttributionUrlData: (data: AttributionUrlOutput): void =>
      set({ attributionUrlData: data }),

    clear: (): void => {
      deleteCookie(AUTH_COOKIE_NAME);
      deleteCookie(STEP_COOKIE_NAME);
      set({
        token: '',
        merchantId: '',
        leadId: '',
      });
    },

    clearCookies: (): void => {
      deleteCookie(AUTH_COOKIE_NAME);
      deleteCookie(STEP_COOKIE_NAME);
    },

    setOthersSigning: (othersSigning): void => set({ othersSigning }),
  })
);
