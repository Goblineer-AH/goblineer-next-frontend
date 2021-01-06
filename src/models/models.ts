export interface Item {
    id: number;
    internalId: number;
    context?: number | null;
    modifiers?: number[] | null;
    bonuses?: number[] | null;
    petBreedId?: number | null;
    petLevel?: number | null;
    petQualityId?: number | null;
    petSpeciesId?: number | null;
}

export interface Auction {
    bid: number;
    price: number;
    quantity: number;
    timeLeft: string;
}

export interface ItemPriceDetails {
    item: Item;
    quantity: number;
    marketvalue: number;
    auctions: Auction[];
}