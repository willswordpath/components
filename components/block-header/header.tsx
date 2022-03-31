import React, { HTMLAttributes } from 'react';
import { headerLinks } from './links'
import { Header as DesignHeader } from '../design-block-header'

import { Dropdown } from '@teambit/design.ui.dropdown'
import { dropdownList, dropdownListWithLongNames } from './dropdown.mock';
import { menuTransition } from '@teambit/design.ui.css.menu-transition';
import { hoverable } from '@teambit/design.ui.hoverable';
import classNames from 'classnames';
import { Ellipsis } from '@teambit/design.ui.styles.ellipsis';
import { UserAvatar, OrgAvatar } from '@teambit/design.ui.avatar';
import styles from './item.module.scss';

export type ItemProps = {
    image?: string;
    name: string;
    isActive?: boolean;
    accountType?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Item({ image, name, className, isActive, accountType = 'user', ...rest }: ItemProps) {
    return (
        <div {...rest} className={classNames(styles.item, isActive && styles.active, className)}>
            {accountType === 'organization' ? (
                <OrgAvatar size={20} account={{ profileImage: image, name }} className={styles.orgImg} />
            ) : (
                <UserAvatar size={20} account={{ profileImage: image, name }} />
            )}
            <Ellipsis>{name}</Ellipsis>
        </div>
    );
}


const activeOption = {
    image: 'https://static.bit.dev/bit-logo.svg',
    name: 'teambit',
};
export function DropdownExample() {
    return (
        <Dropdown menuClass={menuTransition} placeholder={false} placeholderTitle={<Item {...activeOption} />}>
            {dropdownList.map((listItem, index) => (
                <Item
                    key={index}
                    className={hoverable}
                    image={listItem.image}
                    name={listItem.name}
                    isActive={activeOption.name === listItem.name}
                />
            ))}
        </Dropdown>
    );
}



export function Header() {
    return <DesignHeader menuLinks={headerLinks} plugins={[DropdownExample]} />;
}
