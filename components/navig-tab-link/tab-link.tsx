import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom'
import type { NavLinkProps } from 'react-router-dom'
import classNames from 'classnames';
import style from './tab-link.scss';

export interface TabLinkProps extends NavLinkProps {
    borderPosition?: 'top' | 'bottom' | 'left' | 'right'
    /**
     * add styling attributes to the rendered element when it matches the current URL
     */
    activeClassName?: string;
}

/**
 * a component used to display a nav link, usually used in headers or tabs to display a specific active ui
 */
export const TabLink = forwardRef<HTMLAnchorElement, TabLinkProps>(
    ({ className, activeClassName, children, borderPosition = 'bottom', ...restProps }: TabLinkProps, ref) => {
        return (
            <NavLink
                data-position={borderPosition}
                className={isActive => classNames(style.tabLink, className,
                    isActive && style.active,
                    isActive && activeClassName
                )}
                {...restProps}
                ref={ref}
            >
                <div>{children}</div>
            </NavLink>
        );
    }
);
