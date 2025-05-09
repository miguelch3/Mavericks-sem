import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Form: {
      labelColor: 'rgba(55, 73, 117)',
      fontSize: 14,
    },
  },
  token: {
    fontWeightStrong: 500,
    fontFamily: 'Poppins',
    fontSize: 16,
    colorPrimary: 'rgba(55, 73, 117, 0.04)',
  },
};
