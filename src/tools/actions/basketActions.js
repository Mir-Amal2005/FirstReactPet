import { supabase } from "../../supabase/supabaseClient";
import { toast } from 'react-toastify';
export const getBasket = (basket) =>({
    type:"GET_BASKET",
    basket
}); 


export const basketAddItem = (user_nick, item) => async (dispatch) => {
    try {
        // Fetch existing basket for the user
        const { data: existingBasket, error: fetchError } = await supabase
            .from('Basket')
            .select('*')
            .eq('user_name', user_nick)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
        }

        // If a basket exists, update it
        if (existingBasket) {
            const updatedBasket = [...existingBasket.user_basket, item];
            const { error: updateError } = await supabase
                .from('Basket')
                .update({ user_basket: updatedBasket })
                .eq('user_name', user_nick);

            if (updateError) {
                throw updateError;
            }
            toast.success("Item added to your existing basket!");
        } else {
            // If no basket exists, insert a new one
            const { error: insertError } = await supabase
                .from('Basket')
                .insert([{ user_name: user_nick, user_basket: [item] }]);

            if (insertError) {
                throw insertError;
            }
            toast.success("Item added to a new basket!");
        }
    } catch (error) {
        toast.error("Error adding item to basket: " + error.message);
    }
};