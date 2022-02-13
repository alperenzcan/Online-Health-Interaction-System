import React from 'react';
import { NavLink } from 'react-router-dom'

const NavbarListItem = ({to,title}) => {
    return (
        <li className="nav-item">
            <NavLink className="nav-link" to={to}>{title}</NavLink>
        </li>
    )
};

export default NavbarListItem;
