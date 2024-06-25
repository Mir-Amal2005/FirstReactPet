import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const prData = useSelector(state => state.market);
    const { slug } = useParams();
    const productDetails = prData.find(p => slugify(p.g_title) === slug);

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

    const sliderImages = productDetails?.g_slider ? Object.values(productDetails.g_slider) : [];
    const minSettings = productDetails?.g_minSettings;
    const maxSettings = productDetails?.max_settings;
    const dlc = productDetails?.dlc;
    const bundle = productDetails?.bundle;

    const handleImageOpen = (imageSrc) => {
        Swal.fire({
            html: `<div class="slideImageV"><img src=${imageSrc} /></div>`,
            confirmButtonText: 'X',
        });
    };

    return (
        <div className='prDetailsSection'>
            <div className="container">
                <div className="left">
                    <img src={productDetails?.g_image} alt="" className='mainImg' />
                    {sliderImages.length > 0 && (
                        <div className="sliderSec">
                            <Slider {...settings}>
                                {sliderImages.map((image, index) => (
                                    <div key={index} className="sliderImageContainer">
                                        <img src={image} alt={`slider-${index}`} className="sliderImage" onClick={() => handleImageOpen(image)} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
                <div className="right">
                    <div className="genres">
                        <div className="types">
                            {Array.isArray(productDetails?.g_genre) ? (
                                productDetails.g_genre.map((item, index) => (
                                    <div key={index} className='genreBox'><h5>{item}</h5></div>
                                ))
                            ) : (
                                <div>No genres available</div>
                            )}
                        </div>
                    </div>
                    <div className="tit">
                        <h1>{productDetails?.g_title}</h1>
                    </div>
                    <div className="desc">
                        <p>{productDetails?.g_description}</p>
                    </div>
                    <div className="price">
                        <h4 className={productDetails?.discount ? 'strikethrough' : ''}>{productDetails?.g_price} $</h4>
                        {productDetails?.discount && <h3>{productDetails.discount} $</h3>}
                    </div>
                    <div className="buttonSect">
                        <button><FaShoppingCart /></button>
                    </div>
                </div>
            </div>

            {productDetails?.g_video && (
                <div className="video">
                    <video src={productDetails.g_video} controls muted autoPlay infinite width={800} height={500}></video>
                </div>
            )}

            {minSettings && maxSettings && (
                <div className="settingCont">
                    <div className="left" data-aos="fade-down">
                        <h1>Min. Settings</h1>
                        <ul>
                            {Object.entries(minSettings).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="right" data-aos="fade-down">
                        <h1>Max. Settings</h1>
                        <ul>
                            {Object.entries(maxSettings).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {dlc && (
                <div className="dlc">
                    <h2 id='dl'>DLC</h2>
                    {Object.entries(dlc).map(([dlcKey, dlcValue]) => (
                        <div key={dlcKey} className="dlcSection">
                            {dlcValue.map((dlcItem, index) => (
                                <div key={index} className="dlcItem">
                                    <img src={dlcItem.dlc_img} alt={dlcItem.dlc_title} className="dlcImg" />
                                    <div className="inf">
                                        <h3>{dlcItem.dlc_title}</h3>
                                        <p>Price: {dlcItem.dlc_price} $</p>
                                        <p className='desc'>{dlcItem.dlc_desc}</p>
                                        <button><FaShoppingCart /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {bundle && (
                <div className="bundle">
                    <h2 id='bundle'>Bundle</h2>
                    {Object.entries(bundle).map(([bundleKey, bundleValue]) => (
                        <div key={bundleKey} className="bundleSection">
                            {bundleValue.map((bundleItem, index) => (
                                <div key={index} className="bundleItem">
                                    <img src={bundleItem.bundle_img} alt={bundleItem.bundle_title} className="bundleImg" />
                                    <div className="inf">
                                        <h3>{bundleItem.bundle_title}</h3>
                                        <p>Price: {bundleItem.bundle_price} $</p>
                                        <p className='desc' id='bundDs'>{bundleItem.bundle_desc}</p>
                                        <button><FaShoppingCart /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
