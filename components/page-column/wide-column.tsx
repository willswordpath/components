import React from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import style from './page-frame.module.scss';

export interface WideColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    className?: string
}

export function WideColumn({ children, className, ...rest }: WideColumnProps) {
    return <div className={classNames(style.wideColumn, className)} {...rest}>{children}</div>;
}
