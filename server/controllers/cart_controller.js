const {pool} = require("../db")
const ApiError = require("../error/ApiError");

class Cart_controller {
    async addToCart (req,res,next){
        try{
            const userId = req.user.id
            const productId = req.params.id
            console.log('body: ',productId)
            const checkCartQuery = 'SELECT * FROM public.cart_items WHERE cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1) AND product_id = $2';
            const {rows} = await pool.query(checkCartQuery,[userId,productId])
            if (rows.length > 0) {
                console.log(rows)
                // Если товар уже есть в корзине, увеличиваем его количество
                const updateCartQuery = 'UPDATE public.cart_items SET quantity = quantity + 1 WHERE cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1) AND product_id = $2';
                const updateCartValues = [userId, productId];
                await pool.query(updateCartQuery, updateCartValues);
            } else {
                // Если товара еще нет в корзине, добавляем его
                const addToCartQuery = 'INSERT INTO public.cart_items (cart_id, product_id, price) VALUES ((SELECT cart_id FROM public.cart WHERE user_id = $1), $2, (SELECT price FROM public.product WHERE id = $2)) RETURNING *';
                const addToCartValues = [userId, productId];
                let data = await pool.query(addToCartQuery, addToCartValues);
                return res.json(data.rows)
            }
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async getCart(req,res,next) {
        try {
            const userId = req.user.id
            const viewCartQuery = 'SELECT product.id, product.img, product.name, product.price, cart_items.quantity FROM public.cart_items JOIN public.product ON cart_items.product_id = product.id WHERE cart_items.cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1) ORDER BY cart_items.id';
            const { rows } = await pool.query(viewCartQuery, [userId]);
            res.json(rows)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async deleteAll(req,res,next){
        try{
            console.log('enTer')
            const clearCartQuery = 'DELETE FROM public.cart_items WHERE cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1)';
            const clearCartValues = req.user.id;
            console.log('id = ',req.user.id)
            await pool.query(clearCartQuery, [clearCartValues]);
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async ReduceOne(req, res, next) {
        try {
            const userId = req.user.id;
            const productId = Number(req.params.id);
            const removeFromCartQuery = 'UPDATE public.cart_items SET quantity = quantity - 1 WHERE cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1) AND product_id = $2';
            const removeFromCartValues = [userId, productId];
            await pool.query(removeFromCartQuery, removeFromCartValues).then(res.json('Success'));
            return res.end('success')
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async UpdateOne(req,res,next){
        try{
                const userId = req.user.id
                const productId = Number(req.params.id)
                const updateCartQuery = 'UPDATE public.cart_items SET quantity = quantity + 1 WHERE cart_id = (SELECT cart_id FROM public.cart WHERE user_id = $1) AND product_id = $2';
                const updateCartValues = [userId, productId];
                await pool.query(updateCartQuery, updateCartValues);
                return res.end('success')
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async DeleteOne(req,res,next){
        try {
            const userId = req.user.id
            const productId = Number(req.params.id)
            console.log('userID = ',userId)
            console.log('productID = ',Number(productId))
            const clearCartQuery = 'DELETE FROM cart_items WHERE cart_id = (SELECT cart_id FROM carts WHERE user_id = $1) AND product_id = $2';
            const clearCartValues = [userId,productId];
            await pool.query(clearCartQuery, clearCartValues);
            return res.end('success')
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}
module.exports = new Cart_controller()