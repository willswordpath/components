import { ComponentType, createContext, useContext } from 'react'
import type { BaseThemeProps } from '../theme-base'

export type ThemeName = 'light' | 'dark'

export type ThemeOption = ComponentType<BaseThemeProps> & {
    themeName: ThemeName
}

export interface ThemeSwitchData {
    /**
     * theme currently in use
     */
    current: ThemeOption
    /**
     * all valid themes
     */
    options: ThemeOption[]
    /**
     * user pick a theme from options, and pass it to this function to switch theme
     */
    setTheme: (option: ThemeOption) => void
}

export const themeSwitchContext = createContext<ThemeSwitchData | undefined>(undefined)

export const useThemeSwitch = () => useContext(themeSwitchContext)
