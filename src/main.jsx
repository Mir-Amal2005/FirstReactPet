import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/style.scss'
import 'aos/dist/aos.css';

import { supabase } from './supabase/supabaseClient.js'
import { Provider } from 'react-redux';

import { getGames } from './tools/actions/gamesActions.js'
import { getCommunities } from './tools/actions/communitiesActions.js'
import { getBlog } from './tools/actions/blogActions.js'

import { appStore } from './tools/store/gamesStore.js'
import { getDiscussions } from './tools/actions/discActions.js'
import { getComment } from './tools/actions/commentActions.js'
import { getUser } from './tools/actions/userActions.js'
import { getMarket } from './tools/actions/marketActions.js'
import { getBasket } from './tools/actions/basketActions.js';


const store = appStore();


store.subscribe(() => {
  console.log(store.getState());
})

const fetchData = async () => {
  const { data: games, error: gamesError } = await supabase
    .from('Games')
    .select()
  if (gamesError) {
    console.error(gamesError);
  } else {
    store.dispatch(getGames(games));
    console.log(games);
  }

  const { data: communities, error: communitiesError } = await supabase
    .from('Communities')
    .select()
  if (communitiesError) {
    console.error(communitiesError);
  } else {
    store.dispatch(getCommunities(communities));
    console.log(communities);
  }

  const { data: blog, error: blogError } = await supabase
    .from('Blog')
    .select()
  if (blogError) {
    console.error(blogError)
  }
  else {
    store.dispatch(getBlog(blog));
    console.log(blog);
  }

  const { data: discussions, error: discussionsError } = await supabase
    .from('Discussions')
    .select()
  if (discussionsError) {
    console.error(discussionsError)
  }
  else {
    store.dispatch(getDiscussions(discussions));
    console.log(discussions);
  }

  const { data: comment, error: commentError } = await supabase
    .from('Comments')
    .select()
  if (commentError) {
    console.error(commentError);
  } else {
    store.dispatch(getComment(comment));
    console.log(comment);
  }

  const {data: user, error: userError} = await supabase
  .from('Users')
  .select()
  if(userError){
    console.error(userError);
  }
  else{
    store.dispatch(getUser(user));
    console.log(user);
  }

  const {data: market, error: marketError} = await supabase
  .from('Marketplace')
  .select()
  if(marketError){
    console.error(marketError);
  }
  else{
    store.dispatch(getMarket(market));
    console.log(market);
  }

  const {data:basket,error:basketError} = await supabase
  .from('Basket')
  .select()
  if(basketError){
    console.error(basketError);
  }
  else{
    store.dispatch(getBasket(basket));
    console.log(basket);
  }
}
fetchData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
