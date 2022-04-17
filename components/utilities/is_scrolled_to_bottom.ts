export function isScrolledToBottom(element: HTMLElement): boolean {
    return (element.scrollHeight - Math.round(element.scrollTop)) === element.clientHeight
}
