export const marketReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_MARKET":
            return action.market;
        default:
            return state;
    }
}