import React from 'react'
import { User } from './user'

interface ContactProps {
    id: string
    name: string
    email: string
    site: string
}

export function Contact({ id, name, email, site }: ContactProps) {
    return <div>
        <address>
            {`Contact ${name} via `}
            <a data-testid="email" href={'mailto:' + email}>
                email
            </a>
            {' or on their '}
            <a data-testid="site" href={site}>
                website
            </a>.
        </address>
        <User id={id} />
    </div>
}
