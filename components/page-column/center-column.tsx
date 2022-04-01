import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import style from './page-frame.module.scss';

export interface CenterColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    className?: string
}

export function CenterColumn({ children, className, ...rest }: CenterColumnProps) {
    return <div className={classNames(style.centerColumn, className)} {...rest}>{children}</div>;
}
