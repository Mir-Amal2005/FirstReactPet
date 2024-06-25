import React from 'react'
import { useSelector } from 'react-redux'
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";
import { SlUserFollow } from "react-icons/sl";
import Swal from 'sweetalert2';


const Discussions = () => {

    const discuss = useSelector((state) => state.discussions);
    const comment = useSelector((state) => state.comment);
    const users = useSelector((state) => state.user);

    const commentRanges = {
        1: [0, 4],
        2: [4, 7],
    }

    const handleClick = (item) => {

        const range = commentRanges[item.id] || [0, 0];
        const [start, end] = range;
        const filterComments = comment.slice(start, end);

        const commentsHtml = filterComments.map((cmt) => `
            <div class='userComment'>
                <div class="userCommentBody">
                    <div class="userCommentImage">
                        <img src=${cmt.userImage} alt="" />
                        <p>${cmt.userId}</p>
                    </div>
                    <div class="userCommentTextSection">
                        <p>${cmt.userComment}</p>
                    </div>
                    <div class="userCommentLikeBtnSection"><button>L</button></div>
                </div>
                <div class="userCommentLikess">
                    <p>${cmt.postLikes} likes</p>
                </div>
            </div>
        `).join('');

        Swal.fire({
            html: `
                <div class="modal-container">
                    <div class="image-section">
                        <img src="${item.image}" alt="Image 1">
                        <div class="userInput">
                            <img src="${item.image}">
                            <form>
                                <input type="text" placeholder="Comment..." />
                                <button type="submit">></button>
                            </form>

                        </div>
                    </div>
                    <div class="comments-section">
                        <div class="weSec">
                            <img src=${item.user_img} alt="" />
                            <p>${item.username}</p>
                            <p>${item.time}</p>
                        </div>
                        ${commentsHtml}
                    </div>
                </div>
            `,
            confirmButtonText: 'X',
        });
    };
    return (
        <div className='discusSection'>
            <div className="cont">
                <div className="main">
                    {
                        discuss.map((item) => {
                            return (
                                <>
                                    <div className="card" key={item.id}>
                                        <div className="card-title">
                                            <img src={item.user_img} alt="" />
                                            <p>{item.username}</p>
                                            <p id='time'>{item.time}</p>
                                        </div>
                                        <div className="card-image">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <div className="card-body">
                                            <div className="icons">
                                                <button><FaRegHeart /></button>
                                                <button onClick={() => handleClick(item)} id='cm'><FaRegComment /></button>
                                                <button><PiTelegramLogo /></button>
                                            </div>
                                            <div className="likes">
                                                <p>{item.likes} likes</p>
                                            </div>
                                            <div className="descrp">
                                                <p>{item.username}: {item.description}</p>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="sideRec">
                    <div className="topC">
                        <img src="src/assets/images/bt.png" alt="" />
                        <p>Darn_Craft</p>
                        <button><CiCirclePlus /></button>
                    </div>
                    <div className="bodyC">
                        <div className="title">
                            <h1>Recommendations:</h1>
                        </div>
                        {
                            users.map((item) => {
                                return (
                                    <div className="userCard">
                                        <img src={item.user_photo} alt="" />
                                        <div className="inf">
                                            <p>{item.user_nick}</p>
                                            <p>{item.user_followers} followers</p>
                                        </div>
                                        <button title='subscribe'><SlUserFollow /></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discussions