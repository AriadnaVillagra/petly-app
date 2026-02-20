//apps/mobile/src/themes/presets/neo.ts

import { AppTheme } from '../AppTheme'

export const neoPreset: Partial<AppTheme> = {
  layout: {
    borderRadius: 0,
    borderWidth: 3,
    spacingUnit: 10,
  },
  shadow: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  typography: {
    fontFamily: 'System',
    sizes: {
      sm: 12,
      md: 16,
      lg: 22,
      xl: 30,
    },
  },
}
