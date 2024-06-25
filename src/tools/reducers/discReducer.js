export const discReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_DISCUSSIONS":
            return action.discussions;
        default:
            return state;
    }
}