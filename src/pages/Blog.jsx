import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Blog = () => {

  const games = useSelector((state) => state.games);
  const filterTranding = games.filter(item => item.section == 'tranding');

  const blog = useSelector((state) => state.blog);
  const filterRec = blog.filter(item => item.section == 'rec');
  const filterNew = blog.filter(item => item.section == 'new');

  const [first, second, third] = filterRec.length >= 3 ? filterRec : [{}, {}, {}];

  useEffect(() => {
    AOS.init({
      once: false
    });
  }, []);

  return (
    <div className='blog'>

      <div className="topSection">
        <div className="mainNews">
          <div className="text">
            <h1><span><GoDotFill /></span>REGISTERED TEAMS: 19</h1>
          </div>
          <div className="button">
            <Link to='/tournreg'><button className='regBtn'>REGISTER</button></Link>
          </div>
        </div>
        <div className="lives">
          <div className="title">
            <h3>LIVES</h3>
          </div>
          <div className="streams">

            <div className="card">
              <div className="card-head">
                <div className="text">
                  <div className="live"><p>LIVE</p></div>
                  <div className="watchers"><p>150K+ viewer</p></div>
                </div>
                <video src="src/assets/video/valoBest.mp4" autoPlay controls muted loop></video>
              </div>
              <div className="card-body">
                <div className="left">
                  <img src="https://www.gamechampions.com/media/2x3ffp5d/what-does-valorant-name-mean.webp" alt="valoStream" />
                </div>
                <div className="right">
                  <h5>VALORANT TOURNAMENT</h5>
                  <p>RIOT GAMES</p>
                  <p>VALORANT</p>
                  <div className="tags">
                    <p>EN</p>
                    <p>VALORANT</p>
                    <p>COMPT</p>
                  </div>
                </div>
                <div className="set">
                  <button><BsThreeDotsVertical /></button>
                </div>
              </div>
            </div>


            <div className="card">
              <div className="card-head">
                <div className="text">
                  <div className="live"><p>LIVE</p></div>
                  <div className="watchers"><p>4K viewer</p></div>
                </div>
                <video src="src/assets/video/pubg.mp4" autoPlay controls muted loop></video>
              </div>
              <div className="card-body">
                <div className="left">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/GodV_at_IEM_2015_San_Jose.jpg" alt="godV" />
                </div>
                <div className="right">
                  <h5>Dominate The Solo PUBG</h5>
                  <p>GodV</p>
                  <p>PUBG</p>
                  <div className="tags">
                    <p>EN</p>
                    <p>PUBG</p>
                    <p>PRO</p>
                  </div>
                </div>
                <div className="set">
                  <button><BsThreeDotsVertical /></button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-head">
                <div className="text">
                  <div className="live"><p>LIVE</p></div>
                  <div className="watchers"><p>50K+ viewer</p></div>
                </div>
                <video src="src/assets/video/faker.mp4" autoPlay controls muted loop></video>
              </div>
              <div className="card-body">
                <div className="left">
                  <img src="https://koreajoongangdaily.joins.com/data/photo/2023/04/11/0cc7763c-159d-4540-aa0c-8309c7ac7899.jpg" alt="faker" />
                </div>
                <div className="right">
                  <h5>LOL 1 VS 5</h5>
                  <p>FAKER</p>
                  <p>League of Legends</p>
                  <div className="tags">
                    <p>EN</p>
                    <p>LOL</p>
                    <p>SOLO</p>
                  </div>
                </div>
                <div className="set">
                  <button><BsThreeDotsVertical /></button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="blogOneSection">
        <div className="trandingGames">
          <div className="title">
            <h3>Tranding Games</h3>
          </div>
          <div className="trandingBodies">
            {

              filterTranding.map((item) => {
                return (
                  <div className="card" style={{
                    backgroundImage: `url(${item.image})`,
                  }}>
                    <p className="view">{item.desc} viewers</p>
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="interest">
          <div className="title"><h3>Recommended Articles</h3></div>
          <div className="inf">

            <div className="left" style={{
              backgroundImage: `url(${first.image})`,
            }} data-aos="fade-right">
              <div className="title">
                <h1>{first.title}</h1>
              </div>
            </div>
            <div className="right">
              <div className="tp-nw" style={{
                backgroundImage: `url(${second.image})`,
              }} data-aos="fade-up-left">
                <div className="title">
                  <h1>{second.title ? second.title.slice(0, 22) : ''}...</h1>                </div>

              </div>
              <div className="bt-nw" style={{
                backgroundImage: `url(${third.image})`,
              }} data-aos="fade-down-left">
                <div className="title">
                  <h1>{third.title ? third.title.slice(0, 22) : ''}...</h1>                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="blogMainSection">
        <div className="title">
          <h1>NEWS</h1>
        </div>
        <div className="news">
          {
            filterNew.map((item) => {
              return (
                <div className="card" data-aos="fade-down">
                  <div className="card-img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="card-body">
                    <h5>{item.title}</h5>
                    <p>{item.description.slice(0, 200)}...</p>
                    <div className="publisher">
                      <div className="left">
                        <img src={item.userImg} alt="" />
                      </div>
                      <div className="right">
                        <Link>{item.user}</Link>
                      </div>
                    </div>
                    <div className="read-more">
                      <button>READ MORE</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>100</button>
        </div>
      </div>
    </div>
  )
}

export default Blog