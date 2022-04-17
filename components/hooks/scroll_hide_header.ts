import { useRef, useState, useEffect } from 'react'

export function useScrollHideHeader() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [headerHidden, setHeaderHidden] = useState(false)
    useEffect(() => {
        const scrollContainer: HTMLDivElement = scrollContainerRef.current as HTMLDivElement
        let lastScrollTop: number = scrollContainer.scrollTop
        let throttleCallback: number | undefined = undefined
        function onscroll() {
            // throttled event would be simply discarded, rather than raising a pending request
            if (throttleCallback != undefined)
                return

            const diffScrollTop = scrollContainer.scrollTop - lastScrollTop
            lastScrollTop = scrollContainer.scrollTop

            throttleCallback = window.setTimeout(() => {
                throttleCallback = undefined

                if (diffScrollTop > 0)
                    setHeaderHidden(true)
                else if (diffScrollTop < 0)
                    setHeaderHidden(false)
            }, 50)  // throttle events to a rather low frequency, 20FPS
        }
        scrollContainer.addEventListener('scroll', onscroll)
        return () => {
            scrollContainer.removeEventListener('scroll', onscroll)
        }
    }, [])
    return { scrollContainerRef, headerHidden }
}
