import React from "react";
import classes from './Header.module.css'
const Header=()=>
{
    return(<React.Fragment>
        <ul className={classes.header}>
            <li>
                <p>MAIL BOX CLIENT</p>
            </li>
        </ul>
    </React.Fragment>)
}
export default Header;