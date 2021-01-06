import React from 'react';
import { ServerPicker } from '../server-picker/ServerPicker';

import styles from './NavBar.module.scss';

export default () => {
    return (
        <nav className={styles.nav}>
            <span className={styles.title}>Goblineer</span>
            <ul className={styles.links_ul}>
                <li>Home</li>
                <li>Items</li>
                <li><ServerPicker /></li>
            </ul>
        </nav>
    );
}