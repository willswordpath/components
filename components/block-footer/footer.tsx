import style from './footer.scss'
import React, { ReactNode } from 'react'
import { Footer as DesignFooter } from '../design-block-footer'
import { footerLinks } from './footer-links'
import classNames from 'classnames'

export type FooterProps = {
    /**
     * children to be rendered on the footer bottom section.
     */
    children?: ReactNode;
};

export function Footer({ children }: FooterProps) {
    return (
        <DesignFooter categoryList={footerLinks} className={classNames(style.footer)}>
            {children}
        </DesignFooter>
    )
}
