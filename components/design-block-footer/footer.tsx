import React from 'react'
import classNames from 'classnames'
import { Category, CategoryProps } from './category'
import styles from './footer.scss'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * a list categories of links to be displayed in the footer
     */
    categoryList: CategoryProps[]
}

export function Footer({ categoryList, className, children, ...rest }: FooterProps) {
    return (
        <div {...rest} className={classNames(styles.footer, className)}>
            <div className={styles.footerLinks}>
                {categoryList.map((category) => {
                    return <Category {...category} key={category.title} className={styles.footerCategory} />
                })}
            </div>
            <div className={styles.bottom}>{children}</div>
        </div>
    )
}
