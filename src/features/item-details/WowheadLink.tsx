import React, { useEffect } from 'react';
import { Item } from '../../models/models';

export const WowheadLinkOnlyId = ({ itemId, ...props }: { itemId: number } & any) => {
    const item: Item = {
        id: itemId,
        internalId: 0,
    };
    return <WowheadLink item={item} {...props} />
}

export const WowheadLink = ({ item, ...props }: { item: Item } & any) => {
    const wowheadItemData = (item: Item) => {
        let queryParams = [];
        if(item.bonuses) {
            queryParams.push(`bonus=` + item.bonuses.join(':'));
        }
        
        const ilvlIndex = item.modifiers?.findIndex(x => x === 9);
        if(ilvlIndex !== undefined && ilvlIndex >= 0) {
            queryParams.push(`ilvl=${item.modifiers?.[ilvlIndex + 1]}`);
        }
        
        const data = `item=${item.id}?` + queryParams.join('&');
        return data;
    }
    const className = props.className ?? '';

    useEffect(() => {
        window.$WowheadPower.refreshLinks();
    }, [item]);

    return (
        <a href="#" data-wowhead={wowheadItemData(item)} data-wh-rename-link="true" {...props} className={`q3 links ${className}`}></a>
    );
}