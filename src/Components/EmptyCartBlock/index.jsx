import React from 'react';
import styles from "./EmptyCartBlock.module.scss"

export const EmptyCartBlock = () => {
    return (
        <>
            <h1 className={styles.root}>
                <span>♣</span>
                <br />
                Bb lox :D
            </h1>       
            <h1 className={styles.desc}>god damn man... go back pls (кутак)</h1> 
        </>

    );
};

export default EmptyCartBlock