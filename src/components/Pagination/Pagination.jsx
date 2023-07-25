import React from 'react';
import {getPagesArray} from "../../utils/pages";
import { MyButton } from '../MyButton/MyButton';

export const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages, page);

      return (
        <div className="page__wrapper">
          <MyButton  onClick={() => changePage(1)}>First</MyButton>
          <MyButton disabled={page === 1} onClick={() => changePage(page-1)}>{"<"}</MyButton>
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={page === p ? 'page page__current': 'page'}
                >
                        {p}
                    </span>
                    
            )}
            <MyButton disabled={page === totalPages} onClick={() => changePage(page+1)}>{">"}</MyButton>
            <MyButton  onClick={() => changePage(totalPages)}>Last</MyButton>
        </div>
    );
};

