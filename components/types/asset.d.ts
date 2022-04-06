declare module '*.png' {
    const src: string
    export default src
}

declare module '*.svg' {
    import type { ComponentType, SVGProps } from 'react'
    export const ReactComponent: ComponentType<SVGProps<SVGSVGElement> & { title?: string }>

    const src: string
    export default src
}

declare module '*.jpg' {
    const src: string
    export default src
}

declare module '*.jpeg' {
    const src: string
    export default src
}

declare module '*.gif' {
    const src: string
    export default src
}

declare module '*.bmp' {
    const src: string
    export default src
}
