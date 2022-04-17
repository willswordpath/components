import React, { useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header } from '../block-header'
import { WideColumn } from '../page-column'
import { Footer } from '../block-footer'
import { ThemeSwitch } from '../theme-switch'
import { Main } from '../layout-content-sidebar'
import { useScrollHideHeader } from '../hooks'

export function WikiApp() {

    const { scrollContainerRef, headerHidden } = useScrollHideHeader()

    const constContent = useMemo(() => {
        return <>
            <WideColumn>

                <Switch>
                    <Route path="/wiki">
                        <Main />
                    </Route>
                </Switch>


            </WideColumn>

            <Footer>
                <h1>Test Footer Content</h1>
            </Footer>
        </>
    }, [])

    return (
        <ThemeSwitch initialTheme="light" innerRef={scrollContainerRef}>
            <Header hidden={headerHidden} />
            {constContent}
        </ThemeSwitch>
    )
}
