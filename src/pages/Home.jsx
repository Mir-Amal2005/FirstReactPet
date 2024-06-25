import React, { useEffect, useRef } from 'react'
import { FaEye, FaPlus } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
const Home = () => {
  const characterRef = useRef(null);
  const contactSectionRef = useRef(null);

  const games = useSelector((state) => state.games);
  const filterFavGames = games.filter(item => item.section == 'favorite');
  const filterSellFavGames = games.filter(item => item.section == 'mostsell');

  const communities = useSelector((state) => state.communities);
  const filterCommunities = communities.filter(item => item.section == "communities");

  useEffect(() => {
    AOS.init({
      once: false
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            characterRef.current.style.transform = 'translateX(-115px)';
          } else {
            characterRef.current.style.transform = 'translateX(-700px)';
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);
  return (
    <div className='homePage'>
      <div className="topSection">
        <div className="leftPl">
          <div className="mainBanner">
            <div className="bg"></div>
            <div className="left">
              <span id='new'>NEW</span>
              <h1><span id='as'>ASSASIN'S</span> <span id='mid'><div id='line1'></div>CREED<div id='line2'></div></span> <span id='val'>VALHALLA</span></h1>
              <p id='text'>"Assassin's Creed Valhalla" is an action role-playing game developed by Ubisoft and released in November 2020. It is the twelfth major installment in the Assassin's Creed series.</p>
              <p id='price'>49.99$</p>
              <div className="buttonSection">
                <button>BUY</button>
                <button>ADD TO CART</button>
              </div>
            </div>
            <div className="right">
              <img src="src/assets/images/Valhala.png" alt="" />
            </div>
          </div>
          <div className="bestSell">
            <div className="title">
              <p>Most Selling Products</p>
            </div>
            <div className="cards">
              {

                filterSellFavGames.map((item) => {
                  return (
                    <div className="card">
                      <div className="bg" style={{
                        backgroundImage: `url(${item.image})`,
                      }}></div>
                      <h1>{item.title}</h1>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="ads">
            <div className="title">
              <p>Sponsors</p>
            </div>
            <div className="adsCont">
              <div className="cont1"></div>
              <div className="cont2"></div>
              <div className="cont3"></div>
            </div>
          </div>
        </div>
        <div className="rightPl">
          <div className="favGames">
            <div className="title">
              <p>Favorite Games</p>
            </div>
            <div className="favBody">
              {
                filterFavGames.map((item) => {
                  return (
                    <div className="card">
                      <div className="img" style={{
                        backgroundImage: `url(${item.image})`,
                      }}></div>
                      <div className="text">
                        <div className="top">
                          <h5>{item.title}</h5>
                        </div>
                        <div className="bottom">
                          <p>{item.desc.slice(0, 120)}...</p>
                        </div>
                      </div>
                      <div className="button">
                        <button><FaEye /></button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="friends">
            <div className="title">
              <p>Community</p>
            </div>
            <div className="partyBody">

              {
                filterCommunities.map((item) => {
                  return (
                    <div className="card">
                      <div className="img" style={{
                        backgroundImage: `url(${item.images})`,
                      }}></div>
                      <div className="text">
                        <div className="top">
                          <h5>{item.names}</h5>
                        </div>
                        <div className="bottom">
                          <p>{item.players}</p>
                        </div>
                      </div>
                      <div className="button">
                        <button><FaPlus /></button>
                      </div>
                    </div>
                  );
                })
              }



            </div>
          </div>
        </div>
      </div>
      <div className="middleSection">
        <div className="leftSection">
          <div className="container container_1" data-aos="fade-right">
            <img src="https://gmedia.playstation.com/is/image/SIEPDC/Controller-XL@2x?fmt=png-alpha&scl=1" alt="playstationGamepad" />
            <div className="text">
              <h1>PlayStation 5</h1>
              <p>The PlayStation 5 (PS5) is Sony's latest gaming console, featuring powerful hardware, lightning-fast load times, and stunning graphics. It offers a rich library of games, immersive DualSense controller feedback, and backward compatibility with PS4 titles, making it a must-have for gamers.</p>
              <button>READ MORE</button>
            </div>
            <img src="https://www.kickgame.com/cdn/shop/products/sony-playstation-ps5-blu-ray-edition-console-uk-plug-white_1.png?v=1665665535&width=1024" alt="playstation" />
          </div>
          <div className="container container_2" data-aos="fade-left">
            <div className="text">
              <h1>XBOX</h1>
              <p>The Xbox Series X, Microsoft's latest gaming console, boasts powerful performance with its custom AMD processor, delivering 4K resolution and up to 120 FPS. It features quick load times, backward compatibility with four generations of Xbox games, and a vast game library through Xbox Game Pass.</p>
              <button>READ MORE</button>
            </div>
            <img src="https://res-2.cloudinary.com/grover/image/upload/v1672246075/wsxsowkkqdxms8appbz3.png" alt="xbox" />
          </div>
          <div className="container container_3" data-aos="fade-right">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nintendo_Switch_Portable.png/800px-Nintendo_Switch_Portable.png?20230328041408" alt="nintendo" />
            <div className="text">
              <h1>Nintendo</h1>
              <p>Nintendo, a pioneering video game company, is renowned for its innovative consoles and iconic franchises like Mario, Zelda, and Pokémon. Known for the Nintendo Switch, which combines home and portable gaming, Nintendo consistently delivers unique, family-friendly gaming experiences that appeal to players of all ages.</p>
              <button>READ MORE</button>
            </div>
          </div>
          <div className="container container_4" data-aos="fade-left">
            <img src="https://cdn2.unrealengine.com/Unreal+Engine%2Feg-logo-filled-1255x1272-0eb9d144a0f981d1cbaaa1eb957de7a3207b31bb.png" alt="epic" />
            <div className="text">
              <h1>Epic Games</h1>
              <p>Epic Games is a prominent video game developer and publisher, best known for creating the massively popular game Fortnite. They also developed the Unreal Engine, a leading game development platform used across the industry. Epic Games Store offers a digital distribution platform for PC games, challenging traditional market leaders.</p>
              <button>READ MORE</button>
            </div>
          </div>
        </div>
        <div className="rightSection">
          <div className="container" data-aos="fade-up-left">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png" alt="steam" />
            <div className="title">
              <h1>Steam</h1>
              <p>Steam, developed by Valve Corporation, is the leading digital distribution platform for PC gaming. Launched in 2003, it revolutionized the gaming industry by providing gamers with a vast library of titles available for download. Steam offers features such as automatic game updates, cloud saves, and a vibrant community with user reviews, forums, and social networking. It supports a wide range of indie and AAA games, and frequent sales events attract millions of users. Additionally, Steam Workshop allows players to share mods and custom content. Its comprehensive ecosystem, including VR support and a marketplace for digital goods, solidifies Steam's dominance in PC gaming.</p>
            </div>
            <button>READ MORE</button>
          </div>
        </div>
      </div>
      <div className="contactSection" ref={contactSectionRef}>
        <div className="character" ref={characterRef}>
          <img src="https://purepng.com/public/uploads/large/purepng.com-super-mariomariofictional-charactervideo-gamefranchisenintendodesigner-1701528634759ak3n1.png" alt="mario" />
          <div className="text">
            <p>CAN I HELP YOU?</p>
          </div>
        </div>
        <div className="contactForm">
          <form>
            <h1>CONTACT US</h1>
            <input type="text" placeholder='Full name' />
            <input type="email" placeholder='Email' />
            <input type="text" placeholder='Subject*' />
            <textarea name="text" cols={20} rows={20} placeholder='Text...'></textarea>
            <button type='submit'>Submit</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Home