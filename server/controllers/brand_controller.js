const {pool} = require("../db");
const ApiError = require("../error/ApiError");

class Brand_controller{
    async create(req,res,next){
        const {name} = req.body
        const candidate = await pool.query('SELECT name FROM public.brand WHERE name=$1',[name])
        if(candidate.rows[0]){
            return next(ApiError.badRequest('Такой бренд уже существует!'))
        }
        const type = await pool.query("INSERT INTO public.brand (name) VALUES ($1) RETURNING *",[name])
        return res.json(type)
    }
    async getAll(req,res){
        const types = await pool.query('SELECT * FROM public.brand')
        res.json(types.rows)
    }
    async deleteOne(req, res, next) {
        try {
            const {id} = req.params;
            const brand = await pool.query('DELETE FROM public.brand WHERE id=$1', [id]);
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
                'UPDATE public.brand SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
            res.json(updateType.rows[0]);
        }
        catch(e) {
            next(ApiError.internal(e.message))
        }
    }
}
module.exports = new Brand_controller()