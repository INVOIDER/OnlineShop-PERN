const uuid = require('uuid') //Подключаем модуль генерации случайного уникального имени
const path = require("path") // Подключаем модуль пути
const {pool} = require("../db")
const ApiError = require('../error/ApiError')
const {query} = require("express");
class Product_controller {
    async create(req, res, next) {
        try {
            const {name, typeID, brandID, price, amount, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = pool.query('INSERT INTO public.product(name, "typeID", "brandID", price,amount, img, description)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *', [name, typeID, brandID, price, amount, fileName, description])
            return res.json(device.rows)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        // const product = await pool.query('SELECT * FROM public.product')
        let {brandID, typeID, limit, page} = req.query
        page = page || 1 //Номер страницы, которую нужно вывести
        limit = limit || 8 //Максимум элементов на странице
        let offset = page * limit - limit
        let devices;
        if (!brandID && !typeID) {
            devices = await pool.query('SELECT *, COUNT(*) OVER() as count FROM public.product LIMIT $1 OFFSET $2', [limit, offset])
        }
        if (!brandID && typeID) {
            devices = await pool.query('SELECT *, COUNT(*) OVER() as count FROM public.product WHERE "typeID"=$1 LIMIT $2 OFFSET $3', [typeID, limit, offset])
        }
        if (brandID && !typeID) {
            devices = await pool.query('SELECT *, COUNT(*) OVER() as count FROM public.product WHERE "brandID"=$1 LIMIT $2 OFFSET $3', [brandID, limit, offset])
        }
        if (brandID && typeID) {
            devices = await pool.query('SELECT *, COUNT(*) OVER() as count FROM public.product WHERE "brandID"=$1 AND "typeID"=$2 LIMIT $3 OFFSET $4', [brandID, typeID, limit, offset])
        }
        res.json(devices.rows)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await pool.query('SELECT * FROM public.product WHERE id=$1 LIMIT 1', [id])
        return res.json(device.rows)
    }

    async deleteOne(req, res, next) {
        try {
            const {id} = req.params;
            const device = await pool.query('DELETE FROM public.product WHERE id=$1', [id]);
            res.json('Product was deleted!');
        } catch (e) {
            next(ApiError.internal("Невозможно удалить"))
        }
    }

    async changeOne(req, res,next) {
        try{
        const {id} = req.params;
        const {name, typeID, brandID, price, amount, description} = req.body;
        const {img} = req.files;
        const product = await pool.query('SELECT * FROM public.product WHERE id = $1', [id]);
        let fileName
        if (img){
            fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        const updatedProduct = {
            ...product.rows[0],
            name: name || product.rows[0].name,
            typeID: typeID || product.rows[0].typeID,
            brandID: brandID || product.rows[0].brandID,
            price: price || product.rows[0].price,
            amount: amount || product.rows[0].amount,
            img: fileName || product.rows[0].img,
            description: description || product.rows[0].description
        };
        const updateProduct = await pool.query(
            'UPDATE public.product SET name=$1, "typeID"=$2, "brandID"=$3, price=$4, amount=$5, img=$6, description=$7 WHERE id=$8 RETURNING *', [updatedProduct.name, updatedProduct.typeID, updatedProduct.brandID, updatedProduct.price, updatedProduct.amount, updatedProduct.img, updatedProduct.description, id]);
        res.json(updateProduct.rows[0]);
    }
    catch(e) {
        next(ApiError.internal(e.message))
    }
}
}
module.exports = new Product_controller()