//apps/mobile/src/themes/presets/soft.ts

import { AppTheme } from "../AppTheme";

export const softPreset: Partial<AppTheme> = {
  layout: {
    borderRadius: 16,
    borderWidth: 1,
    spacingUnit: 8,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  typography: {
    fontFamily: 'System',
    sizes: {
      sm: 12,
      md: 16,
      lg: 20,
      xl: 26,
    },
  },
}
