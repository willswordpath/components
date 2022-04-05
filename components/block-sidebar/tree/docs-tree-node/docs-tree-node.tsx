import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation } from '@teambit/base-react.navigation.link'
import { CollapsableTreeNode } from '@teambit/base-ui.graph.tree.collapsable-tree-node'
import type { TreeNodeProps } from '@teambit/base-ui.graph.tree.recursive-tree'
import { NodeTitle } from '../node-title'

export type FolderPayload = {
    icon?: string | ReactNode;
    open?: boolean;
    configPath?: string;
    overviewPath?: string;
    /** @example 'getting-started/installing-bit'; */
    path?: string;
    /** folder display name */
    title?: string;
};

export type DocsTreeNodeProps = Record<string, unknown> & TreeNodeProps<FolderPayload>;

export function DocsTreeNode({ node, depth }: DocsTreeNodeProps) {
    const location = useLocation()
    const isActive = node.payload?.path ? location?.pathname.includes(node.payload?.path) : undefined
    const autoOpen = node.payload?.open || isActive
    const [manuallyOpen, setOpen] = useState(autoOpen ?? true)

    // reset manualOpen when autoOpen changes
    useEffect(() => {
        if (autoOpen !== undefined) {
            setOpen(autoOpen)
        }
    }, [autoOpen])

    const Title = node.payload?.title && (
        <NodeTitle
            id={node.payload?.title}
            icon={node.payload?.icon}
            active={isActive}
            open={manuallyOpen}
            configPath={node.payload?.configPath}
            overviewPath={node.payload?.overviewPath}
            setOpen={setOpen}
        />
    )

    return <CollapsableTreeNode title={Title} isOpen={manuallyOpen} node={node} depth={depth} />
}
