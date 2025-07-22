// theme/index.ts
export const theme = {
  colors: {
    primary: {
      yellow: '#FFD700',
      yellowGlow: '#FFE55C',
      green: '#00FF88',
      greenGlow: '#4DFFAA',
    },
    background: {
      primary: '#0A0A0A',
      secondary: '#1A1A1A',
      tertiary: '#2A2A2A',
      gradient: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
      cardGradient: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05) 0%, rgba(0, 255, 136, 0.05) 100%)',
      glowGradient: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      accent: '#FFD700',
    },
    border: {
      primary: 'rgba(255, 215, 0, 0.2)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      glow: 'rgba(255, 215, 0, 0.4)',
    },
    status: {
      success: '#00FF88',
      error: '#FF4444',
      warning: '#FFB800',
      info: '#4A9EFF',
    }
  },
  fonts: {
    primary: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    glow: '0 0 20px rgba(255, 215, 0, 0.3)',
    greenGlow: '0 0 20px rgba(0, 255, 136, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.4)',
    button: '0 4px 16px rgba(255, 215, 0, 0.2)',
  },
  transitions: {
    fast: '0.15s ease-out',
    medium: '0.3s ease-out',
    slow: '0.5s ease-out',
  }
}

// theme/globalStyles.ts
export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.primary};
    background: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.yellow};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.yellowGlow};
  }

  .glow-effect {
    position: relative;
  }

  .glow-effect::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, ${theme.colors.primary.yellow}, ${theme.colors.primary.green});
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity ${theme.transitions.medium};
  }

  .glow-effect:hover::before {
    opacity: 0.7;
  }

  .grid-pattern {
    background-image: 
      linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  .typing-animation {
    display: inline-block;
    overflow: hidden;
    border-right: 2px solid ${theme.colors.primary.yellow};
    white-space: nowrap;
    animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: ${theme.colors.primary.yellow}; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .float {
    animation: float 3s ease-in-out infinite;
  }
`;