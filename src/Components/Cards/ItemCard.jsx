import React, { useState, useEffect } from 'react'
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { basketAddItem } from '../../tools/actions/basketActions';
import 'react-toastify/dist/ReactToastify.css';
const ItemCard = ({ itemcard }) => {

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
            dispatch(basketAddItem(userData.user_nick, itemcard));
        } else {
            toast.error("User data not found");
        }
    };

    

    return (
        <div className='item_cardd'>
            <div className="topItem">
                <img src={itemcard.g_image} alt="" />
            </div>
            <div className="bottomItem">
                <div className="genre">
                    <h5>Genre:</h5>
                    <div>
                        {Array.isArray(itemcard.g_genre) ? (
                            itemcard.g_genre.map((item, index) => (
                                <div key={index} className='genreBox'><h5>{item.slice(0, 5)}.. </h5></div>
                            ))
                        ) : (
                            <div>No genres available</div>
                        )}
                    </div>
                </div>
                <div className="tit">
                    <h4>{itemcard.g_title}</h4>
                </div>
                <div className="desc">
                    <p>{itemcard.g_description.slice(0, 50)}...</p>
                </div>
                <div className="price">
                    <h5>{itemcard.g_price}$</h5>
                </div>
                <div className="buttons">
                    <button><Link to={`/shop/${slugify(itemcard.g_title)}`}>DETAILS</Link></button>
                    <button onClick={handleAddToBasket} ><IoMdCart /></button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard