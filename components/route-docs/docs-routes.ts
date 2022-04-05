import type { ReactNode } from 'react'
import urlJoin from 'url-join'
// commented out because of cyclic dep. we should make sure this component won't depend on sidebar.
// import type { SidebarTreeNode, SidebarPayload } from '@teambit/docs.ui.sidebar.sidebar';
import type { DocsRoute } from './docs-route'

export interface Route {
    title: string;
    description?: string;
    /** relative path */
    path: string;
    /** absolute path (including baseUrl) */
    absPath: string;
    component: ReactNode;
    plugins: Record<string, unknown>
    displayInSidebar?: boolean;
}

interface Payload {
    icon: string | undefined;
    open: boolean | undefined;
    title: string;
    absPath: string;
    configAbsPath: string | undefined;
    overviewAbsPath: string | undefined;
    displayInSidebar: boolean | undefined;
}

/**
 * another representation of {@link DocsRoute}
 * with path absolutralized
 */
interface TreeNode {
    id: string
    payload: Payload
    children?: TreeNode[]
}

export class DocsRoutes {
    constructor(
        readonly branches: DocsRoute[],
        readonly basePath?: string
    ) { }

    /**
     * constructor wrapper provides default parameters
     */
    static from(routes: DocsRoute[], basePath = '/') {
        return new DocsRoutes(routes, basePath)
    }

    /**
     * single purpose compared to urlJoin: allow parameter parentPath being undefined
     */
    private static accumulatePath(currentPath: string, parentPath?: string) {
        return parentPath ? urlJoin(parentPath, currentPath) : currentPath
    }

    /**
     * @returns absPath = / basePath? / path
     */
    private toAbs(path: string) {
        if (!this.basePath) return path
        return urlJoin(this.basePath, path)
    }

    /**
     * get the list of routes to include.
     * DocsRoute[] to Route[]
     */
    getRoutes(): Route[] {
        return this.branches.flatMap((route) => this.computeRoutes(route))
    }

    /**
     * create a sidebar tree.
     */
    toSideBarTree() {
        return {
            id: '',
            children: this.branches.map((docsRoute) => this.computeTreeNode(docsRoute, this.basePath)),
        }
    }

    /**
     * converts a {@link DocsRoute} into a {@link TreeNode}
     */
    private computeTreeNode(docsRoute: DocsRoute, parentAbsPath?: string): TreeNode {
        // absPath = / (basePath / _parentPath)? / docsRoute.path
        // basePath should be included in the parentAbsPath
        const absPath = DocsRoutes.accumulatePath(docsRoute.path, parentAbsPath)

        const payload: Payload = {
            icon: docsRoute.icon,
            open: docsRoute.open,
            title: docsRoute.title,
            absPath,
            configAbsPath: docsRoute.config?.path && DocsRoutes.accumulatePath(docsRoute.config.path, absPath),
            overviewAbsPath: docsRoute.overview?.path && DocsRoutes.accumulatePath(docsRoute.overview.path, absPath),
            displayInSidebar: docsRoute.displayInSidebar,
        }

        const treeNode: TreeNode = {
            id: docsRoute.path,
            payload
        }

        if (docsRoute.children)
            treeNode.children = docsRoute.children.map((docsRoute) => this.computeTreeNode(docsRoute, absPath))

        return treeNode
    }

    /**
     * flat a {@link DocsRoute} to an array of {@link Route}s
     * @param currentRoute recursive operation node
     * @param parentPath url path prefix of each recurse instance
     * @returns flatten routes
     */
    private computeRoutes(currentRoute: DocsRoute, parentPath?: string): Route[] {
        // thisPath = / parentPath? / currentPath
        const thisPath = DocsRoutes.accumulatePath(currentRoute.path, parentPath)

        const { component, config, overview } = currentRoute

        /**
         * contains categoryRoute of component, configRoute of config, overviewRoute of overview
         */
        const thisRoutes: Route[] = []
        component && thisRoutes.push({
            title: currentRoute.title,
            description: currentRoute.description,
            displayInSidebar: currentRoute.displayInSidebar,
            path: thisPath,
            // absPath = / basePath / parentPath? / currentPath
            absPath: this.toAbs(thisPath),
            component,
            plugins: currentRoute.plugins || {},
        })
        config && thisRoutes.push({
            title: config.title,
            description: config.description,
            path: DocsRoutes.accumulatePath(config.path, thisPath),
            // absPath = / basePath / parentPath? / currentPath / configPath
            absPath: this.toAbs(DocsRoutes.accumulatePath(config.path, thisPath)),
            component: config.component,
            plugins: currentRoute.plugins || {},
        })
        overview && thisRoutes.push({
            title: overview.title,
            description: overview.description,
            path: DocsRoutes.accumulatePath(overview.path, thisPath),
            // absPath = / basePath / parentPath? / currentPath / overviewPath
            absPath: this.toAbs(DocsRoutes.accumulatePath(overview.path, thisPath)),
            component: overview.component,
            plugins: currentRoute.plugins || {},
        })

        if (currentRoute.children) {
            return currentRoute.children
                .flatMap((child) => this.computeRoutes(child, thisPath))
                .concat(thisRoutes)
        }

        return thisRoutes
    }
}
