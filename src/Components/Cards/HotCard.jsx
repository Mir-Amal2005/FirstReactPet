import React, { useState,useEffect } from 'react'
import { IoMdCart } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import slugify from 'slugify';
import { useDispatch } from 'react-redux';
import { basketAddItem } from '../../tools/actions/basketActions';

const HotCard = ({ alldata }) => {


    const dispatch = useDispatch();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    const handleAddToBasket = () => {
        if (userData) {
            dispatch(basketAddItem(userData.user_nick, alldata));
        } else {
            toast.error("User data not found");
        }
    };


    return (
        <div className='hot_card' key={alldata.id}>
            <div className="left">
                <div className="hotTitle">
                    <h1>Hot New Game</h1>
                </div>
                <div className='hot_gamesPhoto' style={{ backgroundImage: `url(${alldata.g_image})` }}>
                    <div className="discount"><h5>50%</h5></div>
                </div>
            </div>
            <div className="right">
                <div className="genres">
                    {Array.isArray(alldata.g_genre) ? (
                        alldata.g_genre.map((item, index) => (
                            <div key={index} className='genreBox'><h5>{item} </h5></div>
                        ))
                    ) : (
                        <div>No genres available</div>
                    )}
                </div>
                <div className="title">
                    <h1>{alldata.g_title}</h1>
                </div>
                <div className="stars">
                    <ul>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaRegStar /></li>
                    </ul>
                </div>
                <div className="description">
                    <p>{alldata.g_description}</p>
                </div>
                <div className="prices">
                    <h6>{alldata.g_price}$</h6>
                    <h4>{alldata.discount}$</h4>
                </div>
                <div className="buttonSection">
                    <button><Link to={`/shop/${slugify(alldata.g_title)}`}>DETAILS</Link></button>
                    <button onClick={handleAddToBasket}><IoMdCart /></button>
                </div>
            </div>
        </div>
    )
}

export default HotCard





// style={{ backgroundImage: `url(${alldata.g_image})`, ...style }}