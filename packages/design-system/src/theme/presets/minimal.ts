//apps/mobile/src/themes/presets/minimal.ts

import { AppTheme } from "../AppTheme";

export const minimalPreset: Partial<AppTheme> = {
  layout: {
    borderRadius: 8,
    borderWidth: 1,
    spacingUnit: 10,
  },
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  typography: {
    fontFamily: 'System',
    sizes: {
      sm: 13,
      md: 17,
      lg: 22,
      xl: 30,
    },
  },
}
