import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = () => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => { console.log(e) }}
                pageRangeDisplayed={7}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />

        </div>

    )
}

export default Pagination