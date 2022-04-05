import style from './sidebar-node.scss'

import React, { ComponentType } from 'react'
import classNames from 'classnames'
import { Link } from '@teambit/base-react.navigation.link'
import { indentClass } from '@teambit/base-ui.graph.tree.indent'
import { TreeNodeProps, TreeNode as TreeNodeType } from '@teambit/base-ui.graph.tree.recursive-tree'

export type WidgetProps<Payload> = {
    node: TreeNodeType<Payload>;
};

export type TreeNodeComponentProps<Payload = any> = {
    widgets?: ComponentType<WidgetProps<Payload>>[];
    icon?: string;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
} & TreeNodeProps<Payload>;

export function TreeNode<T>(props: TreeNodeComponentProps<T>) {
    const { node, icon, onClick, widgets, href } = props

    return (
        <Link
            href={href}
            exact
            strict
            className={classNames(indentClass, style.fileNode)}
            activeClassName={style.active}
            onClick={onClick}
        >
            <div className={style.left}>
                {icon && <img className={style.icon} src={icon} />}
                <span>{node.id.split('/').pop()}</span>
            </div>

            <div className={style.right}>
                {widgets?.map((Widget, index) => (
                    <Widget key={index} node={node} />
                ))}
            </div>
        </Link>
    )
}
