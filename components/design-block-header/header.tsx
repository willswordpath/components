import style from './header.scss';

import React, { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { NavigationMenu, NavigationMenuProps, NavLinkType } from '@teambit/design.ui.navigation.menu';
import { Logo, LogoProps } from '@teambit/design.ui.brand.logo';
import { wideColumn } from '@teambit/base-ui.layout.page-frame';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * a list of links to be displayed in this header
     */
    menuLinks?: NavLinkType[];
    /**
     * an icon component to use to override the icon of this header
     */
    OverrideLogo?: ComponentType<LogoProps>;
    /**
     * an component to use to override the link menu of this header
     */
    OverrideMenu?: ComponentType<NavigationMenuProps>;
    /**
     * a list of components to be displayed in the right side of this header
     */
    plugins?: ComponentType<unknown>[];
}

/**
 * a html header element
 */
export function Header({
    OverrideMenu = NavigationMenu,
    OverrideLogo = Logo,
    menuLinks,
    plugins,
    children,
    className,
    ...restProps
}: HeaderProps) {
    return (
        <header {...restProps} className={classNames(style.header, className)}>
            <div className={classNames(style.headerContent, wideColumn)}>

                <div className={style.left}>
                    <Link to='/'><OverrideLogo className={style.logo} alt="bit-logo" /></Link>
                    <OverrideMenu links={menuLinks} className={style.linkMenu} />
                </div>

                <div className={style.right}>
                    {plugins?.map((Plugin, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Plugin key={index} />
                    ))}
                </div>

            </div>
        </header>
    )
}