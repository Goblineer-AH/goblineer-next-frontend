import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { ServerContext } from '../../app/ServerContext';
import { Item, ItemPriceDetails } from '../../models/models';
import { ItemDetails } from './ItemDetails';

import styles from './ItemSelector.module.scss';

interface TaggedItem {
    item: Item,
    label: string,
    value: string,
}

export const ItemSelector = ({ itemId }: { itemId? : number }) => {
    const [items, setItems] = useState([] as TaggedItem[]);
    const [itemPriceData, setItemPriceData] = useState([] as ItemPriceDetails[]);
    const [selectedItem, setSelectedItem] = useState({} as Item);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({ hadError: false, message: '' });

    const { server } = useContext(ServerContext);
    
    useEffect(() => {
        const handleError = (message: string) => {
            setError({
                hadError: true,
                message
            });
            return;
        }

        const fetchData = async () => {
            let data: ItemPriceDetails[] = [];
            try {
                data = await fetch(`http://localhost:5000/items/prices/${itemId}?serverId=${server}`)
                    .then(res => {
                        if(res.ok) return res.json();
                        else throw new Error(res.statusText);
                    });
            } catch(err) {
                handleError(`Item with id '${itemId}' not found.`);
                return;
            }

            if(data.length === 0) {
                handleError(`Item with id '${itemId}' not found.`)
                return;
            }

            const taggedItems = data.map(({ item }) => {
                const bonuses = item.bonuses?.join(', ');

                let ilvl = undefined;
                if(item.modifiers !== undefined && item.modifiers !== null) {
                    for(let i = 0; i < item.modifiers.length; i += 2) {
                        if(item.modifiers[i] === 9) ilvl = item.modifiers[i+1];
                    }
                }

                let label = '';
                if(ilvl) label += `iLvL: ${ilvl}`;
                if(bonuses) label += ` Bonuses: ${bonuses}`;
                
                label.trim();

                if(label === '') label = 'Default';

                return {
                    item,
                    label: label,
                    value: label,
                };
            });

            setItems(taggedItems);
            setItemPriceData(data);
            setSelectedItem(taggedItems[0].item);

            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, [itemId, server]);

    if(error.hadError) return <div>{error.message}</div>
    if(isLoading) return <div>Loading...</div>;

    // Wraps the react-select to use a better filter method, current one relies on indexOf which isn't great for searching large lists
    // New custom search matches if all words in box are found anywhere in the option.label, case in-sensitive
    const customFilterOption = (option: any, rawInput: string) => {
        const words = rawInput.split(' ');
        return words.reduce(
        (acc: any, cur: any) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
        true,
        );
    };

    const onSelectChanged = (value: any, _actionMeta: any) => {
        setSelectedItem(value.item);
    };

    const selectedItemPriceData = () => 
        itemPriceData.find(({ item }) => item.internalId === selectedItem.internalId);

    return (
        <div>
            <div className={styles.wrapper}>
                {items.length > 1 &&
                <Select className={styles.selector} options={items} defaultValue={items[0]} filterOption={customFilterOption} onChange={onSelectChanged} />}
            </div>

            <ItemDetails itemPriceData={selectedItemPriceData()} />
        </div>
    );
};