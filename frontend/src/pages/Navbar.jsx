import React from "react";
import {Link} from "react-router-dom"

function Navbar() {
    return(
        <ul>
            <li><Link to="/" className="">Home</Link></li>
            <li><Link to="/login" className="aligncenter">Login</Link></li>
        </ul>
    );
}

export default Navbar;