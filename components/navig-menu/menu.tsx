import React, { ReactNode, ComponentType } from 'react';
import classNames from 'classnames';
import { TabLink, TabLinkProps } from '../navig-tab-link';
import style from './menu.scss';

export type NavLinkType = {
    /**
     * title of category
     */
    title: ReactNode;
    /**
     * list of links
     */
    links?: LinkType[];

    /**
     * link href. if a link is provided, links property is ignored.
     */
    href?: string;
};

export type LinkType = {
    /**
     * link display text
     */
    text: ReactNode;
    /**
     * link href
     */
    href: string;
};

export interface NavigationMenuProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    /**
     * list of links to display in the navbar
     */
    links?: NavLinkType[];

    /**
     * An element to use to override the Link in the menu. defaults to TabLink
     */
    Link?: ComponentType<TabLinkProps>;
}

export function NavigationMenu({ links = [], className, Link = TabLink, ...rest }: NavigationMenuProps) {
    return (
        <div {...rest} className={classNames(style.navLinks, className)}>
            {links.map((link) => {
                // const isExternal = link.href?.startsWith('https://') || undefined;
                return (
                    <Link
                        key={link.href}
                        className={style.link}
                        activeClassName={style.active}
                        // TODO
                        to={link.href || '/'}
                    >
                        {link.title}
                    </Link>
                );
            })}
        </div>
    );
}
