import React from 'react';
import NavbarListItem from './NavbarListItem';
import { useSelector } from 'react-redux';
import { ADMIN, DOCTOR } from '../redux/Constants';

const Navbar = () => {

    const { role, isLoggedIn } = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        role: store.role
    }));

    return (
        <div className="bg-light">
            <nav className="navbar navbar-expand-lg navbar-light bg-light container">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <NavbarListItem to='/' title='Anasayfa' />
                            <NavbarListItem to='/about-us' title='Hakkımızda' />
                            <NavbarListItem to='/contact' title='İletişim' />
                            {isLoggedIn && <NavbarListItem to='/get-appointment' title='Randevu Al' />}
                            {(role === DOCTOR || role === ADMIN) && <NavbarListItem to='/schedule-appointment' title='Randevu Oluştur' />}
                            {role === ADMIN && <NavbarListItem to='/signup-doctor' title='Doktor Kayıt' />}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;

