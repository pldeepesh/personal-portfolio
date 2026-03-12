import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        ink: 'var(--color-ink)',
        accent: 'var(--color-accent)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        tint: 'var(--color-tint)'
      },
      boxShadow: {
        editorial: '0 18px 48px rgba(31, 40, 34, 0.08)'
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        reveal: 'reveal 600ms ease-out both'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
