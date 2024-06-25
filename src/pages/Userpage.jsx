import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { editUser } from '../tools/actions/userActions';
const Userpage = () => {

    const [userData, setUserData] = useState({});
    const [userPhotoChange, setUserPhotoChange] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const userDataStr = localStorage.getItem('userData');
        if (userDataStr) {
            const userDataObj = JSON.parse(userDataStr);
            setUserData(userDataObj);
            setUserPhotoChange(userDataObj.user_photo);
        }
    }, []);

    const handleEditUser = async (e) => {
        e.preventDefault();
    
        try {
            await dispatch(editUser({ user_photo: userPhotoChange }));
            const newUserData = { ...userData, user_photo: userPhotoChange };
            localStorage.setItem('userData', JSON.stringify(newUserData));
            setUserData(newUserData);
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleImageUrlBlur = () => {
        handleEditUser(); 
    };

    return (
        <div className='userSection'>
            <div className="container">
                <div className="userInf">
                    <div className="left">
                    {userData && <img src={userData.user_photo} alt="" />}
                            
                    </div>
                    <div className="right">
                    {userData && (
                            <>
                                <h1>
                                    <FaRegUser />: <span>{userData.user_nick}</span>
                                </h1>
                                <h1>
                                    <PiPasswordFill />: <span>{userData.user_pass}</span>
                                </h1>
                                <h1>Age: {userData.user_year}</h1>
                                <h1>Gender: {userData.user_gender}</h1>
                                <h1>Followers: {userData.user_followers}</h1>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Image URL..."
                                        value={userPhotoChange}
                                        onChange={(e) => setUserPhotoChange(e.target.value)}
                                        onBlur={handleImageUrlBlur}
                                    />
                                    <button onClick={handleEditUser}>Send</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
                <div className="achievments">

                </div>
                <div className="buyedGames">

                </div>
            </div>
        </div>
    )
}

export default Userpage