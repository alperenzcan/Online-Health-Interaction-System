import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';

const Logo = () => {

    const { isLoggedIn, name, username } = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        username:store.username,
        name: store.name
    }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess())
    }

    if (isLoggedIn) {
        return (
            <div className="bg-light border-bottom">
                <div className='container d-flex justify-content-between py-2'>
                    <Link className='nav-link text-dark' to='/'><h4>Online Sağlık Etkileşim Sistemi</h4></Link>
                    <div className='d-flex pt-2'>
                        <Link className='nav-link' to={`/${username}`}> {name} </Link>
                        <Link className='nav-link' to='/' style={{ cursor: 'pointer' }} onClick={onLogoutSuccess} >Logout</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-light border-bottom">
                <div className='container d-flex justify-content-between py-2'>
                    <Link className='nav-link text-dark' to='/'><h4>Online Sağlık Etkileşim Sistemi</h4></Link>
                    <div className='d-flex pt-2'>
                        <Link className='nav-link' to='/login'> Giriş / Kayıt </Link>
                    </div>
                </div>
            </div>
        )
    }
};

export default Logo;
