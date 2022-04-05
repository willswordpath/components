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
    configPath: string | undefined;
    overviewPath: string | undefined;
    path: string;
    displayInSidebar: boolean | undefined;
}

interface TreeNode {
    id: string
    payload: Payload
    children?: TreeNode[]
}

export class DocsRoutes {
    constructor(
        readonly tree: DocsRoute[],
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
        return this.tree.flatMap((route) => this.computeRoutes(route))
    }

    /**
     * create a sidebar tree.
     */
    toSideBarTree() {
        return {
            id: '',
            children: this.tree.map((node) => this.computeTreeNode(node, this.basePath)),
        }
    }

    private computePayload(docRoute: DocsRoute, parentPath?: string): Payload {
        // basePath should be included in the parent path
        const thisPath = DocsRoutes.accumulatePath(docRoute.path, parentPath)

        return {
            icon: docRoute.icon,
            open: docRoute.open,
            title: docRoute.title,
            configPath: docRoute.config?.path && DocsRoutes.accumulatePath(docRoute.config.path, thisPath),
            overviewPath: docRoute.overview?.path && DocsRoutes.accumulatePath(docRoute.overview.path, thisPath),
            path: thisPath,
            displayInSidebar: docRoute.displayInSidebar,
        }
    }

    private computeTreeNode(treeNode: DocsRoute, parentPath?: string): TreeNode {
        if (treeNode.children) {
            return {
                id: treeNode.path,
                children: treeNode.children.map((child) =>
                    this.computeTreeNode(child, DocsRoutes.accumulatePath(treeNode.path, parentPath))
                ),
                payload: this.computePayload(treeNode, parentPath),
            }
        }

        return {
            id: treeNode.path,
            payload: this.computePayload(treeNode, parentPath),
        }
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
