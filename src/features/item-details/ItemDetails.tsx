import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Auction, ItemPriceDetails } from '../../models/models';
import { Price } from './Price';

import styles from './ItemDetails.module.scss';
import { ServerContext } from '../../app/ServerContext';
import { WowheadLink } from './WowheadLink';

interface ProcessedAuction {
    bid?: number;
    price: number;
    quantity: number;
}

const AuctionRow = ({ auction, hasBids }: { auction: ProcessedAuction, hasBids: boolean }) =>
    <tr>
        {hasBids &&
        <td>{auction.bid && <Price value={auction.bid}/>}</td>}
        <td><Price value={auction.price}/></td>
        <td>{auction.quantity.toLocaleString()}</td>
    </tr>;

const AuctionsTable = ({ auctions }: { auctions: Auction[] }) => {
    const hasBids = auctions.find(auc => auc.bid !== 0) !== undefined;

    const pricesAndQuantities = auctions
        .reduce((map, auc) => {
            const key = JSON.stringify([auc.bid, auc.price]);
            const newMap = map.set(key, (map.get(key) ?? 0) + auc.quantity);
            return newMap;
        }, new Map<string, number>());

    const processedAuctions = Array.from(pricesAndQuantities, ([key, quantity]) => {
        const [bid, price]: [number|undefined, number] = JSON.parse(key);
        return {
            bid: bid === 0 ? undefined : bid,
            price, quantity
        };
    });

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {hasBids &&
                    <th>Bid</th>}
                    <th>Unit Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {processedAuctions.map(auc => 
                    <AuctionRow auction={auc} key={uuidv4()} hasBids={hasBids} />
                    )}
            </tbody>
        </table>
    );
};

export function ItemDetails({ itemId }: { itemId: number }) {
    const [state, setState] = useState({} as ItemPriceDetails);
    const [isLoading, setIsLoading] = useState(true);

    const { server } = useContext(ServerContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:5000/items/prices/${itemId}?serverId=${server}`)
                .then(res => res.json());
            
            setState(data);
            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, [itemId, server]);

    if(isLoading) return <div>Loading...</div>;

    return (
        <>
        <h2><WowheadLink item={state.item} className={styles.item_name} data-wh-icon-size="medium" /></h2>
        <div className={styles.wrapper}>
            <div className={styles.left_col}>
                <div className={styles.mv_container}>
                    <table className={styles.mv_table}>
                        <tbody>
                            <tr>
                                <td>Marketvalue:</td><td><Price value={state.marketvalue} /></td>
                            </tr>
                            <tr>
                                <td>Quantity:</td><td>{state.quantity.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <img src="https://i.imgur.com/YHwzb4X.png" className={styles.chart} alt=""/>

                <div className={styles.mv_container}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, enim reprehenderit ratione cupiditate, aliquid possimus tempore asperiores, ad numquam eum nostrum. Voluptas reiciendis soluta debitis tenetur nam dolore doloribus. Vitae?</p>
                </div>

            </div>

            <AuctionsTable auctions={state.auctions} />
        </div>
        </>
    );
}