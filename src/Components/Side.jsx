import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { CgGames } from "react-icons/cg";
import { MdShoppingBag } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoCameraOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { GiCardRandom } from "react-icons/gi";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Side = () => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const userPhoto = userData.user_photo || '';
    
    const navigate = useNavigate();
    const logTr = localStorage.getItem('isLoggedIn');

    const onLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        navigate('/login');
    };

    return (
        <div className='side'>
            <div className="logoSection">
                <Link to='/'><img src="src/assets/images/logo.png" alt="" /></Link>
            </div>
            <div className="logSection">
                {
                    logTr === 'true' ? (
                        <div className="container">
                            <Link to='/userpage'><img src={userPhoto}></img></Link>
                            <IoExitOutline onClick={onLogout} />
                        </div>
                    ) : (
                        <Link to='/login' className='log'>Log In</Link>
                    )
                }

            </div>
            <div className="linksSection">
                <Link to='/blog' title='blog'><RiDashboardHorizontalFill /></Link>
                <Link to='/library'><CgGames /></Link>
                <Link to='/shop'><MdShoppingBag /></Link>
                <Link to='/cases'><GiCardRandom /></Link>
                <Link to='/discussions'><IoCameraOutline /></Link>
                <Link to='/friends'><FaUserFriends /></Link>
                <Link to='/trophy'><HiOutlineTrophy /></Link>
            </div>
            <div className="bottomSection"></div>
        </div>
    )
}

export default Side