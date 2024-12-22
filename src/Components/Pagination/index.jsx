import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({count, onChangePage}) => {
    return (
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => { onChangePage(e.selected+1) }}
                pageRangeDisplayed={7}
                pageCount={count}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />

        </div>

    )
}

export default Pagination