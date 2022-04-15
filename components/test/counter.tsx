import React, { useState } from 'react'

export function Counter({ onClick }: { onClick: (newCount: number) => void }) {
    const [count, setCount] = useState(0)

    return <div data-testid="count" onClick={() => {
        const newCount = count + 1
        onClick(newCount)
        setCount(newCount)
    }}>
        {count}
    </div>
}
