import React from 'react';
import styles from './Price.module.scss';

export const Price = ({ value }: { value: number }) => {
    // Price is defaulted to coppers
    const silverValue = Math.floor((value / 100) % 100);
    const goldValue = Math.floor(value / 10000);
    
    const silver = silverValue.toString().padStart(2, '0');
    const gold = goldValue.toLocaleString();

    return (
        <>
            {gold}<span className={styles.goldSpan}>g </span>
            {silver}<span className={styles.silverSpan}>s</span>
        </>
    );
};