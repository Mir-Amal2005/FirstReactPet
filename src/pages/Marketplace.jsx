import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LuCrown } from "react-icons/lu";
import { IoMdCart } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import AOS from 'aos';

import HotCard from '../Components/Cards/HotCard';
import { Link } from 'react-router-dom';
import Bundle from '../Components/Cards/Bundle';
import Slider from "react-slick";
import Swal from 'sweetalert2';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from '../Components/Cards/ItemCard';
import slugify from 'slugify';


const Marketplace = () => {

    const marketData = useSelector(state => state.market);
    const filterGames = marketData.filter(item => item.category === 'videogames');



    const filterBundle = marketData.filter(item => item.category === "bundle");


    const filterGift = marketData.filter(item => item.category === "giftcard");
    const indices = [1, 5, 11];
    const selectedGiftItems = filterGift.filter((item, index) => indices.includes(index));

    const streetFighter = filterGames[69];




    //Settings start
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });


    const handleSettings = () => {
        Swal.fire({
            title: 'Settings',
            html: `
                <input type="text" id="search-input" class="swal2-input" placeholder="Search for a game">
                <select id="year-filter" class="swal2-input">
                    <option value="">Select Year</option>
                    ${[...new Set(filterGames.map(game => game.g_year))].map(year => `<option value="${year}">${year}</option>`).join('')}
                </select>
                <select id="genre-filter" class="swal2-input">
                    <option value="">Select Genre</option>
                    ${[...new Set(filterGames.flatMap(game => game.g_genre))].map(genre => `<option value="${genre}">${genre}</option>`).join('')}
                </select>
                <div class="swal2-input" style="display: flex; justify-content: space-between;">
                    <input type="number" id="price-min" placeholder="Min Price" style="width: 45%;">
                    <input type="number" id="price-max" placeholder="Max Price" style="width: 45%;">
                </div>
                <div id="search-results" class="search-results"></div>
            `,
            confirmButtonText: 'Close',
            didOpen: () => {
                document.getElementById('search-input').addEventListener('input', handleSearch);
                document.getElementById('year-filter').addEventListener('change', handleSearch);
                document.getElementById('genre-filter').addEventListener('change', handleSearch);
                document.getElementById('price-min').addEventListener('input', handleSearch);
                document.getElementById('price-max').addEventListener('input', handleSearch);
            },
            preConfirm: () => {
                document.getElementById('search-input').removeEventListener('input', handleSearch);
                document.getElementById('year-filter').removeEventListener('change', handleSearch);
                document.getElementById('genre-filter').removeEventListener('change', handleSearch);
                document.getElementById('price-min').removeEventListener('input', handleSearch);
                document.getElementById('price-max').removeEventListener('input', handleSearch);
            }
        });
    };

    const applyFilters = (query, year, genre, minPrice, maxPrice) => {
        return filterGames.filter(game => {
            const matchesQuery = game.g_title.toLowerCase().includes(query.toLowerCase());
            const matchesYear = year ? game.g_year === parseInt(year) : true;
            const matchesGenre = genre ? game.g_genre.includes(genre) : true;
            const matchesPrice = game.g_price >= minPrice && game.g_price <= maxPrice;
            return matchesQuery && matchesYear && matchesGenre && matchesPrice;
        });
    };

    const handleSearch = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const year = document.getElementById('year-filter').value;
        const genre = document.getElementById('genre-filter').value;
        const minPrice = parseInt(document.getElementById('price-min').value) || 0;
        const maxPrice = parseInt(document.getElementById('price-max').value) || 100;

        setSearchQuery(query);
        setSelectedYear(year);
        setSelectedGenre(genre);
        setPriceRange({ min: minPrice, max: maxPrice });

        const results = applyFilters(query, year, genre, minPrice, maxPrice);
        setSearchResults(results);

        const searchResultsContainer = document.getElementById('search-results');
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = results.map(game => `
                <div class='item_card' style="width: 20vw; height: auto; padding: 5px; background: url('src/assets/images/ss.png'); background-position: center; background-size: cover;">
                    <div class="topItem" style="width: 100%; height: auto;">
                        <img src="${game.g_image}" alt="${game.g_title}" style="width: 100%; height: auto; object-fit: contain; border-radius: 5px;" />
                    </div>
                    <div class="bottomItem" style="padding: 5px; background-color: rgba(0, 0, 0, 0.7); height: auto; width: 100%; position: relative; left: -5px;">
                        <div class="genre" style="width: 100%; display: flex; padding: 5px; border-radius: 5px; position: relative; left: -5px; justify-content: space-evenly;">
                            <h5 style="width: 10%; color: white; font-family: Lakes;">Genre:</h5>
                            <div style="display: flex; justify-content: space-evenly; width: 100%; height: auto; flex-wrap: wrap;">
                                ${Array.isArray(game.g_genre) ? game.g_genre.map((item, index) => `
                                    <div key="${index}" class="genreBox" style="width: 100%; height: auto;">
                                        <h5 style="color: goldenrod;font-size:12px;">${item}</h5>
                                    </div>
                                `).join('') : '<div>No genres available</div>'}
                            </div>
                        </div>
                        <div class="tit" style="color: white; font-family: Lakes;">
                            <h4>${game.g_title}</h4>
                        </div>
                        <div class="desc" style="color: white; font-family: Lakes;">
                            <p>${game.g_description.slice(0, 50)}...</p>
                        </div>
                        <div class="price" style="color: white; font-family: Lakes;">
                            <h5>${game.g_price}$</h5>
                        </div>
                        <div class="buttons" style="width: 100%; display: flex; justify-content: space-around;">
                            <button style="width: 30%; background-color: goldenrod; font-family: Lakes; font-size: 20px; border-radius: 5px; border: none;">
                                <a href="/shop/${slugify(game.g_title)}" style="color: white; font-family: Lakes; font-size: 20px; text-shadow: 2px 0px 2px black;">DETAILS</a>
                            </button>
                            <button style="width: 30%; background-color: goldenrod; font-family: Lakes; font-size: 20px; border-radius: 5px; border: none;">BUY</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };
    //Settings end

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    useEffect(() => {
        AOS.init({
            once: false
        });
    }, []);

    //For filter our games by Year
    const filterByYear = (year) => {
        return filterGames.filter(item => item.g_year === year);
    }

    //For render games in the our sections 
    const renderGamesByYear = (year) => {
        const games = filterByYear(year);
        console.log(games);
        return games.slice(0, 3).map(game => (
            <ItemCard itemcard={game}></ItemCard>
        ));
    }


    //SeeMore
    const handleSeeMore = (year) => {
        const games = filterByYear(year);
        const gameElements = games.map(game => `
            <div class='item_card' style="width: 20vw; height: auto; padding: 5px; background: url('src/assets/images/ss.png'); background-position: center; background-size: cover;">
                <div class="topItem" style="width: 100%; height: auto;">
                    <img src="${game.g_image}" alt="${game.g_title}" style="width: 100%; height: auto; object-fit: contain; border-radius: 5px;" />
                </div>
                <div class="bottomItem" style="padding: 5px; background-color: rgba(0, 0, 0, 0.7); height: auto; width: 100%; position: relative; left: -5px;">
                    <div class="genre" style="width: 100%; display: flex; padding: 5px; border-radius: 5px; position: relative; left: -5px; justify-content: space-evenly;">
                        <h5 style="width: 10%; color: white; font-family: Lakes;">Genre:</h5>
                        <div style="display: flex; justify-content: space-evenly; width: 100%; height: auto; flex-wrap: wrap;">
                            ${Array.isArray(game.g_genre) ? game.g_genre.map((item, index) => `
                                <div key="${index}" class="genreBox" style="width: 100%; height: auto;">
                                    <h5 style="color: goldenrod;font-size:12px;">${item}</h5>
                                </div>
                            `).join('') : '<div>No genres available</div>'}
                        </div>
                    </div>
                    <div class="tit" style="color: white; font-family: Lakes;">
                        <h4>${game.g_title}</h4>
                    </div>
                    <div class="desc" style="color: white; font-family: Lakes;">
                        <p>${game.g_description.slice(0, 50)}...</p>
                    </div>
                    <div class="price" style="color: white; font-family: Lakes;">
                        <h5>${game.g_price}$</h5>
                    </div>
                    <div class="buttons" style="width: 100%; display: flex; justify-content: space-around;">
                        <button style="width: 30%; background-color: goldenrod; font-family: Lakes; font-size: 20px; border-radius: 5px; border: none;">
                            <a href="/shop/${slugify(game.g_title)}" style="color: white; font-family: Lakes; font-size: 20px; text-shadow: 2px 0px 2px black;">DETAILS</a>
                        </button>
                        <button style="width: 30%; background-color: goldenrod; font-family: Lakes; font-size: 20px; border-radius: 5px; border: none;">BUY</button>
                    </div>
                </div>
            </div>
        `).join('');

        Swal.fire({
            html: `
                <div class="seeVgGames">
                    <div class="title" style="width: 100%; height: 5vh; padding: 5px; display: flex; align-items: center; justify-content: space-between; gap: 60px;">
                        <h1 style="color: white; font-size: 36px; font-family: Lakes; border-bottom: 2px solid goldenrod; padding: 5px;">${year} Year</h1>
                    </div>
                    <div class="Segamess" style="width: 100%; height: auto; display: flex!important; margin: 20px 0px 0px 20px; flex-wrap: wrap; justify-content: space-around; gap:20px;">
                        ${gameElements}
                    </div>
                </div>
            `,
            confirmButtonText: 'X'
        });
    }


    return (
        <div className='marketplaceSection'>
            <div className="topSection">
                <img src="src/assets/images/logo.png" alt="" />
                <div className="text-box">
                    <h1 className='pouring'>Buy Games From Us</h1>
                </div>
            </div>

            <div className="hottest">
                <div className="left">
                    {streetFighter && <HotCard alldata={streetFighter} key={streetFighter.id} />}
                </div>
            </div>

            <div className="bundles">
                <div className="top">
                    <div className="title">
                        <h1>Bundles</h1>
                    </div>
                    <div className="seeMore">
                        <Link to='/shop/bundles'>View More</Link>
                    </div>
                </div>
                <div className="choose">
                    {
                        filterBundle.slice(0, 3).map((item) => {
                            return (
                                <Bundle bundledata={item}></Bundle>
                            )
                        })
                    }
                </div>
            </div>

            <div className="adv">
                <iframe src="https://store.steampowered.com/widget/2016590/" frameborder="0" width="646" height="190" data-aos="zoom-in"></iframe>
                <iframe src="https://store.steampowered.com/widget/2840770/" frameborder="0" width="646" height="190" data-aos="zoom-in"></iframe>
            </div>

            {/* <div className="giftCards">
                <div className="top">
                    <div className="title">
                        <h1>Gift Cards</h1>
                    </div>
                    <div className="seeMore">
                        <Link to='/shop/giftcards'>View More</Link>
                    </div>
                </div>
                <Slider {...settings}>
                    {
                        filterGift.map((item) => {
                            return (
                                <div className='slideI' key={item.id} data-aos="fade-down">
                                    <img src={item.g_image} alt="" />
                                    <div className="btSec">
                                        <h3>{item.g_title}</h3>
                                        <div className="btn">
                                            <button><IoMdCart /></button>
                                            <button><FaEye /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>


            </div> */}


            <div className="mainShop">
                <div className="top">
                    <h1>VIDEOGAMES</h1>
                    <button className='settings' onClick={handleSettings}><IoIosSettings /></button>
                </div>

                <div className="shopSec">

                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(year => (
                        <div className="vgGames" key={year} data-aos="zoom-in-down">
                            <div className="title">
                                <h1>{year} Year</h1>
                                <button onClick={() => handleSeeMore(year)}>VIEW MORE</button>
                            </div>
                            <div className="gamess">
                                {renderGamesByYear(year)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Marketplace




