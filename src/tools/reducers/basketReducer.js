export const basketReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_BASKET":
            return action.basket;
        default:
            return state;
    }
}