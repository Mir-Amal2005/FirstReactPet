import { supabase } from "../../supabase/supabaseClient";

export const getUser = (user) => ({
    type: "GET_USER",
    user
});


export const newUser = ({ username, email, password, gender, age, photo }) => async (dispatch) => {
    try {
        const { data: existingUser, error: checkError } = await supabase
            .from('Users')
            .select('*')
            .or(`user_nick.eq.${username},user_mail.eq.${email}`)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            throw checkError;
        }

        if (existingUser) {
            throw new Error('User with this username or email already exists.');
        }

        const { data, error } = await supabase
            .from('Users')
            .insert([{ user_nick: username, user_mail: email, user_pass: password, user_gender: gender, user_year: age, user_photo: photo }]);

        if (error) throw error;

        dispatch(getUser(data));
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
    try {
        const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('user_mail', email)
            .eq('user_pass', password)
            .single();

        if (error) throw error;

        dispatch(getUser(data));
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const editUser = (update) => async (dispatch, getState) => {
    try {
        const userId = getState().user.id;
        const { data, error } = await supabase
            .from('Users')
            .update(update)
            .eq('id', userId);

        if (error) throw error;

        dispatch(editUserSuccess(data));
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
};



export const editUserSuccess = (user) => ({
    type: "EDIT_USER_SUCCESS",
    user
});