import React, { useEffect, useState } from 'react'
import { IoMdCart } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import AOS from 'aos';
import slugify from 'slugify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { basketAddItem } from '../../tools/actions/basketActions';

const Bundle = ({ bundledata }) => {


    const dispatch = useDispatch();

    const [userData, setUserData] = useState(null);

    const handleAddToBasket = () => {
        if (userData) {
            dispatch(basketAddItem(userData.user_nick, bundledata));
        } else {
            toast.error("User data not found");
        }
    };


    useEffect(() => {
        AOS.init({
            once: false
        });

        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    return (
        <div className='bundleCard' style={{ backgroundImage: `url(${bundledata.bundleBack})` }} data-aos="zoom-in">

            <div className="title">
                <h1>{bundledata.g_title}</h1>
            </div>
            <div className='bundlePhoto' style={{ backgroundImage: `url(${bundledata.g_image})` }}> </div>
            <div className="buyIt">
                <h5>{bundledata.g_price}$</h5>
                <div className="buttonSect">
                    <button onClick={handleAddToBasket}><IoMdCart /></button>
                    <button><Link to={`/shop/${slugify(bundledata.g_title)}`}><FaEye /></Link></button>
                </div>
            </div>
        </div>
    )
}

export default Bundle