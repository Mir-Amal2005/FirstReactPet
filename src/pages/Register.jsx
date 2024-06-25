import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { newUser } from '../tools/actions/userActions';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('MAN');
    const [photo, setPhoto] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await dispatch(newUser({ username, email, password, gender, age, photo }));
            navigate('/login');
        } catch (err) {
            setError(err.message);
            alert('Registered user');
        }
    };

    return (
        <div className='registerSection'>
            <div className="sec">

                <div className="container">
                    <div className="title">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="formSection">
                        <form>
                            <div className="inpSec">
                                <label>Username</label>
                                <input type="text" placeholder='Username...' value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="inpSec">
                                <label>Email</label>
                                <input type="email" placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="inpSec">
                                <label>Password</label>
                                <div className="pass">
                                    <input type="password" placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <button><FaEye /></button>
                                </div>
                            </div>
                            <div className="inpSec" id="genderYear">
                                <div className="left">
                                    <select name="GENDER" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="MAN">MAN</option>
                                        <option value="WOMAN">WOMAN</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                </div>
                                <div className="right">
                                    <input type="number" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} required />
                                </div>
                            </div>
                            <div className="inpSec">
                                <input type="text" placeholder='Image URL' value={photo} onChange={(e) => setPhoto(e.target.value)} />
                            </div>
                            <div className="inpSec">
                                <button id='loginBtn' onClick={handleRegister}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register