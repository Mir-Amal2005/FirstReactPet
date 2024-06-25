export const userReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_USER":
            return action.user;
        case "EDIT_USER_SUCCESS":
            return { ...state, ...action.user };
        default:
            return state;
    }
};
