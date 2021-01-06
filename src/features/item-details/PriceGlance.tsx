import React, { useContext, useEffect, useState } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import { ServerContext } from '../../app/ServerContext';
import { Item } from '../../models/models';
import { Price } from './Price';
import { WowheadLinkOnlyId } from './WowheadLink';

interface PriceGlance {
    item: Item;
    marketvalue: number;
    quantity: number;
}

const PriceGlanceRow = ({ itemId }: { itemId: number }) => {
    const [state, setState] = useState({} as PriceGlance);
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
            let data = {} as PriceGlance;
            try {
                data = await fetch(`http://localhost:5000/items/glance_price/${itemId}?serverId=${server}`)
                    .then(res => {
                        if(res.ok) return res.json();
                        else throw new Error(res.statusText);
                    });
            } catch(err) {
                handleError(`Item with id '${itemId}' not found.`);
                return;
            }

            setState(data);
            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, [itemId]);

    if(error.hadError) return <tr><td>{error.message}</td></tr>
    if(isLoading) return <tr><td>Loading...</td></tr>;

    return (
        <tr>
            <td><WowheadLinkOnlyId itemId={itemId} href={`/items/${itemId}`} /></td>
            <td><Price value={state.marketvalue} /></td>
            <td>{state.quantity}</td>
        </tr>
    );
}

export const PriceGlanceTable = ({ itemIds }: { itemIds: number[] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Marketvalue</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
            {itemIds.map(id => 
                <PriceGlanceRow key={uuidv4()} itemId={id} />
            )}
            </tbody>
        </table>
    );
}