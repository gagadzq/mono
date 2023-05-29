/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      black: '#000',
      white: '#fff',
      yellow: {
        deep: '#e8ac65',
        light: '#ffcb69'
      },
      green: {
        light: '#f9fbf6',
        middle: '#9B9B7A',
        deep: '#797d62'
      },
      gray: {
        10: '#F7F9FA',
        20: '#F1F4F6',
        30: '#DFE3E8',
        40: '#C1C6CE',
        50: '#98A0A9',
        60: '#6E7680',
        70: '#444B53',
        80: '#252A30',
        90: '#131619',
        100: '#090B0D'
      },
    },
    spacing: {
      0: '0',
      half: '50%',
      full: '100%',
      '1/4': '2px',
      '1/2': '4px',
      1: '8px',
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      20: '160px',
      30: '240px',
      35: '280px',
      40: '320px',
      50: '400px',
      53: '424px',
      55: '440px',
      65: '520px',
      75: '600px'
    },
    fontSize: {
      10: '10px',
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      22: '22px',
      24: '24px',
      26: '26px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      46: '46px',
      52: '52px',
      58: '58px'
    },
    borderRadius: {
      10: '10px',
      half: '50%'
    }
  },
  plugins: [],
}
