export const clerkAppearance = {
  variables: {
    // Colors
    colorPrimary: '#ffffff',
    colorBackground: 'var(--f1-color-gray)',
    colorText: '#ffffff',
    colorTextSecondary: '#ffffff',
    colorInputBackground: '#ffffff',
    colorInputText: '#ffffff',
    clerkColorNeutral: '#ffffff',
    // Borders
    borderRadius: '0.5rem',
    // Typography
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: '16px',
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 600,
    },
  },
  elements: {
    // All modals and cards
    card: 'shadow-2xl border border-gray-200',
    cardBox: 'rounded-2xl',
    // Headers
    headerTitle: 'text-2xl font-semibold text-gray-900',
    headerSubtitle: 'text-gray-600',
    // Forms
    formButtonPrimary: 'bg-black text-white hover:bg-gray-800 rounded-lg font-medium',
    formFieldInput: 'border-gray-300 rounded-lg focus:border-black focus:ring-black',

    // ==========================================
    // UserButton Popover & Menu Items
    // ==========================================
    userButtonAvatarBox: 'w-10 h-10 rounded-full',
    userButtonPopoverCard: 'shadow-xl rounded-xl border border-gray-200',

    // Fallback styling for standard buttons
    userButtonPopoverActionButtonText: 'font-medium',

    // FORCE OVERRIDE MANAGE ACCOUNT VIA RAW CSS STRINGS
    userButtonPopoverActionButton: {
      color: '#ffffff !important', // Forces text blue (or use your hex color)
      backgroundColor: 'transparent',
    },

    // ==========================================
    // User Profile Modal
    // ==========================================
    modalBackdrop: 'backdrop-blur-md',
    modalContent: 'rounded-2xl shadow-2xl',
    navbar: 'bg-gray-50 border-r border-gray-200',
    navbarButton: 'hover:bg-gray-100 rounded-lg',
    scrollBox: 'bg-white',
    // Footer
    footerActionLink: 'text-white hover:text-gray-700',
  },
};
