import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Auction, ItemPriceDetails } from '../../models/models';
import { Price } from './Price';

import styles from './ItemDetails.module.scss';
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

export function ItemDetails({ itemPriceData }: { itemPriceData: ItemPriceDetails|undefined }) {
    if(itemPriceData === undefined) return <div>Item not found.</div>

    return (
        <>
        <h2><WowheadLink item={itemPriceData.item} className={styles.item_name} data-wh-icon-size="medium" /></h2>
        <div className={styles.wrapper}>
            <div className={styles.left_col}>
                <div className={styles.mv_container}>
                    <table className={styles.mv_table}>
                        <tbody>
                            <tr>
                                <td>Marketvalue:</td><td><Price value={itemPriceData.marketvalue} /></td>
                            </tr>
                            <tr>
                                <td>Quantity:</td><td>{itemPriceData.quantity.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <img src="https://i.imgur.com/YHwzb4X.png" className={styles.chart} alt=""/>

                <div className={styles.mv_container}>
                    <p>Testing CI/CD pipeline</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, enim reprehenderit ratione cupiditate, aliquid possimus tempore asperiores, ad numquam eum nostrum. Voluptas reiciendis soluta debitis tenetur nam dolore doloribus. Vitae?</p>
                </div>

            </div>

            <AuctionsTable auctions={itemPriceData.auctions} />
        </div>
        </>
    );
}