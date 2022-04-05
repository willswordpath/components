import type { ComponentType } from 'react'

export interface DocsPlugin<BottomComponProps = Record<string, unknown>, RightComponProps = Record<string, unknown>> {
    /**
     * the plugin name. can be the class name.
     */
    name: string

    /**
     * add plugins to the doc page.
     */
    page: {
        /**
         * add plugin to the bottom section of the doc page.
         */
        bottom?: ComponentType<BottomComponProps>[]

        /**
         * add plugin to the right section of the doc page.
         */
        right?: ComponentType<RightComponProps>[]
    }
}
