import type { ThemeOption, ThemeName } from '../theme-switch'
import { darkThemeOverride } from './dark-theme-override'

const dark: ThemeName = 'dark'

export const DarkTheme: ThemeOption = {
    themeName: dark,
    override: darkThemeOverride
}