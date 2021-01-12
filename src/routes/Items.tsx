import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemSelector } from '../features/item-details/ItemSelector';

export default () => {
    const { id } = useParams() as { id?: number };

    return (
        <>
            <ItemSelector itemId={id}/>
        </>
    );
}