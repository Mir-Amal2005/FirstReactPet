export const commentReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_COMMENT":
            return action.comment;
        default:
            return state;
    }
}