import { createContext, useContext } from 'react'
import type { Route } from '../route-docs'

export type DocPageContextProps = {
    /**
     * current route.
     */
    route?: Route;

    /**
     * key of the route.
     */
    index?: number;
};

export const docPageContext = createContext<DocPageContextProps>({})

export function useDocPage() {
    return useContext(docPageContext)
}
