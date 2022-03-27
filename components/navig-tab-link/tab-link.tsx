import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import classNames from 'classnames';
import style from './tab-link.scss';

export type TabLinkProps = {
    borderPosition?: 'top' | 'bottom' | 'left' | 'right';
} & LinkProps;

/**
 * A component used to display a nav link, usually used in headers or tabs to display a specific active ui
 *   class to apply when `href` matches the current location
 *   activeClassName?: string;
 */
export const TabLink = forwardRef<HTMLAnchorElement, TabLinkProps>(
    ({ className, /*activeClassName,*/ children, borderPosition = 'bottom', ...rest }: TabLinkProps, ref) => {
        return (
            <Link
                data-position={borderPosition}
                className={classNames(style.tabLink, className)}
                // activeClassName={classNames(style.active, activeClassName)}
                {...rest}
                ref={ref}
            >
                <div>{children}</div>
            </Link>
        );
    }
);
