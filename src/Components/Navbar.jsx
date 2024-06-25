import React, { useState, useEffect } from 'react'

import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { GiBarbedSun } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  let [itemNum, setItemNum] = useState(0);

 

  return (
    <div className='navbar'>
      <div className="leftSection">
        <div className="searchSect">
          <input type="search" placeholder='Search...' />
          <button><FaMagnifyingGlass /></button>
        </div>
      </div>
      <div className="rightSection">
        <button>
          <FaBell />
          <span className='not'>0</span>
        </button>
        <button><IoLanguage /></button>
        <button><GiBarbedSun /></button>
        <button>
          <Link to='/shopcart'><FaShoppingCart /></Link>
          <span className='not'>{itemNum}</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar