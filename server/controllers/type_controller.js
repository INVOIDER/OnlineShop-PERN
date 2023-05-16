const {pool} = require("../db")
const ApiError = require("../error/ApiError");
class Type_controller{
    async create(req,res){
        const {name} = req.body
        const type = await pool.query("INSERT INTO public.type (name) VALUES ($1) RETURNING *",[name])
        return res.json(type.rows)
    }
    async getAll(req,res){
        const types = await pool.query('SELECT * FROM public.type')
        res.json(types.rows)
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params;
            await pool.query('DELETE FROM public.type WHERE id=$1', [id]);
            res.json('Type was deleted!');
        } catch (e) {
            next(ApiError.internal("Невозможно удалить"))
        }
    }
    async changeOne(req, res,next) {
        try{
            const {id} = req.params;
            const {name} = req.body;
            const updateType = await pool.query(
                'UPDATE public.type SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
            res.json(updateType.rows[0]);
        }
        catch(e) {
            next(ApiError.internal(e.message))
        }
    }
}
module.exports = new Type_controller()