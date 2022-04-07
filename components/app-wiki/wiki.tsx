import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { ThemeSwitcher } from '@teambit/design.themes.theme-toggler';
import { Header } from '../block-header'
import { WideColumn } from '../page-column'
import { Footer } from '../block-footer'
import { Wiki } from '../section-wiki'
import { ThemeSwitch } from '../theme-switch'

export function WikiApp() {
    return (
        <ThemeSwitch initialTheme="light">

            <Header />

            <WideColumn>

                <Switch>
                    <Route path="/wiki">
                        <Wiki />
                    </Route>
                </Switch>

                <Footer>
                    <h1>Test Footer Content</h1>
                </Footer>
            </WideColumn>

        </ThemeSwitch>

    )
}
