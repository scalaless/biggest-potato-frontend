import React, { useContext } from "react";
import styles from "./SearchPotato.module.scss"
import { AppContext } from "../../App";

const SearchPotato = () => {
    const {searchPotatoValue, setSearchPotatoValue} = useContext(AppContext)

    return (
        <div className={styles.root}>
            <svg className={styles.icon} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" ><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" /></svg>
            <input value={searchPotatoValue} onChange={(e) => { setSearchPotatoValue(e.target.value) }} placeholder="Поиск грядки..." className={styles.input}></input>
            {searchPotatoValue &&
                <svg onClick={() => { setSearchPotatoValue("") }} className={styles.iconClose}><path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z" /></svg>
            }        </div>
    )
}

export default SearchPotato