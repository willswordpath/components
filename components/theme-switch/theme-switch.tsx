import React, { useState } from 'react'
import { BaseThemeProps } from '../theme-base'
import type { ThemeOption, ThemeName, ThemeSwitchData } from './theme-switch-context'
import { themeSwitchContext } from './theme-switch-context'
import { LightTheme } from '../theme-light'
import { DarkTheme } from '../theme-dark'

export interface ThemeSwitchProps extends BaseThemeProps {
    themes?: ThemeOption[]
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
    themes: availableThemes = basicThemes,
    initialTheme,
    children,
    ...props
}: ThemeSwitchProps) {

    // workaround (*) function state-initializer
    const [Theme, setTheme] = useState<ThemeOption>(() => (
        availableThemes.find(x => x.themeName === initialTheme) || availableThemes[0]
    ))

    const switchData: ThemeSwitchData = {
        current: Theme,
        options: availableThemes,
        // workaround (*) function state-setter
        setTheme: theme => setTheme((last: ThemeOption) => theme)
    }

    return <themeSwitchContext.Provider value={switchData}>
        <Theme {...props}>{children}</Theme>
    </themeSwitchContext.Provider>

}