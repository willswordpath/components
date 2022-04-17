import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
// import { ThemeSwitcher } from '@teambit/design.themes.theme-toggler';
import { Header } from '../block-header'
import { WideColumn } from '../page-column'
import { Footer } from '../block-footer'
import { ThemeSwitch } from '../theme-switch'
import { Main } from '../layout-content-sidebar'

export function WikiApp() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const [headerSticky, setHeaderSticky] = useState({
        hidden: false,
        stickyTop: 0,
    })

    useEffect(() => {
        const scrollContainer: HTMLDivElement = scrollContainerRef.current as HTMLDivElement
        let lastScrollTop = scrollContainer.scrollTop
        function onscroll() {
            const diffScrollTop = scrollContainer.scrollTop - lastScrollTop
            lastScrollTop = scrollContainer.scrollTop
            if (diffScrollTop > 0)
                setHeaderSticky(old => {
                    // switch hidden to true, if it's true already, do nothing
                    if (old.hidden)
                        return old
                    // TODO
                    return { stickyTop: old.stickyTop, hidden: true }
                })
            else if (diffScrollTop < 0)
                setHeaderSticky(old => {
                    // switch hidden to false, if it's false already, do nothing
                    if (!old.hidden)
                        return old
                    // TODO
                    return { stickyTop: old.stickyTop, hidden: false }
                })
        }
        scrollContainer.addEventListener('scroll', onscroll)
        return () => {
            scrollContainer.removeEventListener('scroll', onscroll)
        }
    }, [])

    const content = useMemo(() => {
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
            <Header {...headerSticky} />
            {content}
        </ThemeSwitch>

    )
}
