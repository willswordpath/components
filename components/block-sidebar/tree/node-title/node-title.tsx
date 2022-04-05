import style from './node-title.scss'
import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { useLocation } from '@teambit/base-react.navigation.link'
import { indentClass } from '@teambit/base-ui.graph.tree.indent'
import { Icon } from '@teambit/design.elements.icon'
import { Link } from '@teambit/design.ui.navigation.link'
import { ellipsis } from '@teambit/design.ui.styles.ellipsis'
import { getCustomIcon } from './get-custom-icon'
import { ConfigIcon } from './config-icon'

export type NodeTitleProps = {
    /**
     * folder path
     */
    id: string;

    /**
     * left icon of the title.
     */
    icon?: ReactNode;

    /**
     * open or close the node.
     */
    open?: boolean;

    /**
     * show title as active
     */
    active?: boolean;

    /**
     * configuration path for this docs section.
     */
    configPath?: string;

    /**
     * overview path for this docs section.
     */
    overviewPath?: string;

    /**
     * function that run on folder click.
     */
    setOpen?: (value: React.SetStateAction<boolean>) => void;
};

export function NodeTitle({ id, icon, open, configPath, overviewPath, active, setOpen }: NodeTitleProps) {
    const location = useLocation()
    const isActivePath = !!overviewPath && location?.pathname === overviewPath

    const displayName = id.replace(/\/$/, '').split('/').pop()
    const CustomIcon = getCustomIcon(icon)
    const handleOnFolderClick = () => {
        if (active || !setOpen) return
        setOpen((x) => !x)
    }

    const content = (
        <div className={style.left}>
            <Icon className={classNames(style.icon, !open && style.collapsed)} of="fat-arrow-down" />
            {CustomIcon}
            <span className={classNames(style.name, ellipsis)}>{displayName}</span>
        </div>
    )

    const Title = (
        <div
            className={classNames(indentClass, style.folder, isActivePath && style.active)}
            onClick={handleOnFolderClick}
        >
            {overviewPath ? (
                <Link href={overviewPath} className={classNames(style.folderLink)}>
                    {content}
                </Link>
            ) : (
                content
            )}
            <ConfigIcon configPath={configPath} />
        </div>
    )

    return Title
}
