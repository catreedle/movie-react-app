import React from 'react';
import CreateMovie from '../../movies/CreateMovie';
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import Logout from '../../users/Logout'
const NavBar = props => {
    
    return (
        <div>
            <Navbar expand="md">
                <Nav className="mr-auto" navbar>
                    <NavbarBrand href="/dashboard">Moviey</NavbarBrand>
                    <NavLink href='/favorites'>Favorites</NavLink>
                    <NavItem>
                        {props.isAdmin && <CreateMovie />}
                    </NavItem>
                </Nav>
                <Nav>
                    <NavLink href="/" onClick={Logout}>Logout</NavLink>
                </Nav>
            </Navbar>
            <hr></hr>
        </div>
    )
}

export default NavBar