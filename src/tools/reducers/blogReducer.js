export const blogReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_BLOG":
            return action.blog;
        default:
            return state;
    }
}