import React, { useContext, createContext, useMemo } from 'react'

export type CreateThemeOptions<ThemeSchema> = {
    /**
     * default theme values
     */
    defaults: ThemeSchema;

    /**
     * prefix to use for css vars. defaults to nothing.
     */
    prefix?: string;
};

export type CreateThemeReturns<ThemeSchema> = {
    useTheme: () => ThemeSchema;
    /**
     * div element provides css-vars and react-context
     */
    ThemeProvider: ThemeProviderComponent<ThemeSchema>;
};

/**
 * create a useTheme/Provider context pair with given theme schema
 */
export function createTheme<ThemeSchema>(options: CreateThemeOptions<ThemeSchema>): CreateThemeReturns<ThemeSchema> {
    const context: React.Context<ThemeSchema> = createContext<ThemeSchema>(options.defaults)
    return {
        useTheme: () => useContext(context),
        ThemeProvider: createThemeProvider<ThemeSchema>(context.Provider, options),
    }
}

/**
 * attributes of div element and a override property in addition
 */
export interface ThemeProviderProps<ThemeSchema> extends React.HTMLAttributes<HTMLDivElement> {
    override?: Partial<ThemeSchema>
    innerRef: React.RefObject<HTMLDivElement>
}

/**
 * a React components which is a wrapper div element plus React context provider
 */
export type ThemeProviderComponent<ThemeSchema> = React.ComponentType<ThemeProviderProps<ThemeSchema>>

/**
 * this function is meant to be called inside {@link createTheme}
 * @param Provider the context.Provider object created by {@link createContext}
 * @param options the options provided to {@link createTheme}
 * @returns a {@link ThemeProviderComponent}
 */
function createThemeProvider<ThemeSchema>(
    Provider: React.Provider<ThemeSchema>,
    options: CreateThemeOptions<ThemeSchema>
): ThemeProviderComponent<ThemeSchema> {
    return function ThemeProvider({ children, override, style, innerRef, ...rest }: ThemeProviderProps<ThemeSchema>) {
        const theme = useMemo(
            () => {
                const theme = {
                    ...options.defaults,
                    ...override,
                }
                const cssVars = computeCssVars<ThemeSchema>(theme, options.prefix)

                return { theme, cssVars }
            },
            [override]
        )
        return <div style={{ ...theme.cssVars, ...style }} {...rest} ref={innerRef}>
            <Provider value={theme.theme}> {children} </Provider>
        </div>
    }
}

export function computeCssVars<ThemeSchema>(theme: ThemeSchema, prefix?: string): React.CSSProperties {
    const accumulator: { [index: string]: string | number } = {}
    return Object.entries(theme)
        .map<[string, any]>(([key, val]) => {
            const varName = key.replace(/[A-Z]/g, '-$&').toLowerCase()
            const varKey = prefix ? `--${prefix}-${varName}` : `--${varName}`
            return [varKey, val]
        })
        .reduce((acc, [key, val]) => {
            acc[key] = val
            return acc
        }, accumulator)
}
