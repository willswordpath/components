import React, { useState } from 'react'
import { BaseTheme, BaseThemeProps, LightTheme, DarkTheme } from '../theme-base'
import type { ThemeOption, ThemeName, ThemeSwitchData } from './theme-switch-context'
import { themeSwitchContext } from './theme-switch-context'

export interface ThemeSwitchProps extends BaseThemeProps {
    availableThemes?: ThemeOption[]
    initialTheme?: ThemeName
}

export const basicThemes: ThemeOption[] = [
    LightTheme,
    DarkTheme
]

// (*) 'theme' is as object based on ComponentType, which may be a function ("function component")
// this confuses react's state, as it can accept functions (e.g. setState(x=>x+1) )
// setting it through a function resolves this

export function ThemeSwitch({
    availableThemes = basicThemes,
    initialTheme,
    children,
    override,
    ...props
}: ThemeSwitchProps) {

    // workaround (*) function state-initializer
    const [theme, setTheme] = useState<ThemeOption>(() => (
        availableThemes.find(x => x.themeName === initialTheme) || availableThemes[0]
    ))

    const switchData: ThemeSwitchData = {
        current: theme,
        options: availableThemes,
        // workaround (*) function state-setter
        setTheme: theme => setTheme((_: ThemeOption) => theme)
    }

    return <themeSwitchContext.Provider value={switchData}>
        <BaseTheme override={{...theme.override, ...override}} {...props}>{children}</BaseTheme>
    </themeSwitchContext.Provider>

}