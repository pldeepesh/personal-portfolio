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
        background: 'var(--color-background)',
        paper: 'var(--color-paper)',
        surface: 'var(--color-surface)',
        raised: 'var(--color-surface-raised)',
        ink: 'var(--color-ink)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        success: 'var(--color-success)',
        gold: 'var(--color-gold)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        tint: 'var(--color-tint)'
      },
      boxShadow: {
        editorial: '0 18px 48px rgba(0, 0, 0, 0.28)',
        glow: '0 0 34px rgba(55, 168, 255, 0.24)'
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
