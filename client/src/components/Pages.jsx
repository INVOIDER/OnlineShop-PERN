import React, {useContext} from 'react';
import {Context} from "../index";
import classes from "../styles/pages.module.css";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {device} = useContext(Context)
    let pageCount = Math.ceil(device.totalCount / device.limit)
    let pages = []
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    return (
        <div className={classes.paginationWrapper}>
            <div className={classes.paginationContent}>
                {pages.map(page =>
                    <NavLink key={page} className={device.page === page ? classes.paginationItemActive : classes.paginationItem} onClick={()=>device.setPage(page)}>{page}</NavLink>
                )}
            </div>
        </div>
    );
});
//
export default Pages;