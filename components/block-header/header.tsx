import React from 'react';
import { headerLinks } from './links'
import { Header as DesignHeader } from '../design-block-header'

export function Header() {
    return <DesignHeader menuLinks={headerLinks} />;
}
