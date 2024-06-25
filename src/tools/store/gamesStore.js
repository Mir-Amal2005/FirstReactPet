import { createStore, combineReducers,applyMiddleware} from "redux"
import { gamesReducer } from "../reducers/gamesReducer"
import { communitiesReducer } from "../reducers/communitiesReducer";
import { blogReducer } from "../reducers/blogReducer";
import { discReducer } from "../reducers/discReducer";
import { commentReducer } from "../reducers/commentReducer";
import { userReducer } from "../reducers/userReducer";
import { marketReducer } from "../reducers/marketReducer";
import { basketReducer } from "../reducers/basketReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    games: gamesReducer,
    communities: communitiesReducer,
    blog: blogReducer,
    discussions: discReducer,
    comment: commentReducer,
    user: userReducer,
    market: marketReducer,
    basket:basketReducer
});

export const appStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));    
    return store;
}
