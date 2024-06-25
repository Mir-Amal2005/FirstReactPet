export const communitiesReducer = (state = [],action)=>{
    switch(action.type){
        case "GET_COMMUNITIES":
            return action.communities;
        default:
            return state;
    }
}