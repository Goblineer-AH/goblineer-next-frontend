import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ItemSelector } from '../features/item-details/ItemSelector';

export default () => {
    const history = useHistory();
    const { id } = useParams() as { id?: number };

    return (
        <>
            {/* <button onClick={() => history.goBack()}>Go Back</button> */}
            <ItemSelector itemId={id}/>
        </>
    );
}