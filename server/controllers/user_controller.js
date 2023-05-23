const ApiError = require('../error/ApiError')
const {pool} = require('../db')
const bcrypt = require('bcrypt') // Подключение библиотеки хеширования
const jwt = require('jsonwebtoken') // Подключение библиотеки JWT

function  generateJWT(id,email,role,name){
    return jwt.sign({id,email,role,name},process.env.SECRET_KEY,{expiresIn: '12h'})
}
class UserController{ //Класс для взаимодействия с пользователями
    async registration(req,res,next){ // Функция регистрации пользователя
        const {email,password,name,surname,role} = req.body
        if(!email || !password || !name || !surname){ //Проверка корректности ввода
            return next(ApiError.badRequest('Некорректный ввод данных'))
        }
        const candidate = await pool.query('SELECT email FROM public.user WHERE email=$1',[email])
        if(candidate.rows[0]){
            return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован'))
        }
        const hashPass = await bcrypt.hash(password,5) //Хэшируем пароль
        const usersInfo = [email,name,surname,role,hashPass]
        const user = await pool.query("INSERT INTO public.user (email,name,surname,role,password) VALUES ($1,$2,$3,$4,$5) RETURNING *",usersInfo)
        let customer = user.rows[0]
        const token = generateJWT(customer.id,email,role,name)
        return res.json({token})
    }
    async getUsers(req,res){ //Тестовая функция вывода пользователей
        const users = await pool.query('SELECT * FROM public.user')
        res.json(users.rows)
    }
    async login(req,res,next){
        const {email,password} = req.body
        let user = await pool.query('SELECT id,email,password,role,name FROM public.user WHERE email=$1',[email])
        if ((typeof user.rows[0] == "undefined")){
            return next(ApiError.internal('Неверный email'))
        }
        let comparePassword = bcrypt.compareSync(password,user.rows[0].password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        /*Debug*/ console.log(user.rows[0].id,email,user.rows[0].role,user.rows[0].name,"\n\n\n\n")

        const token = generateJWT(user.rows[0].id,email,user.rows[0].role,user.rows[0].name,"\n\n\n\n")
        return res.json({token})
    }
    async updateUser(req,res,next){
        try {
            const reqBody = req.body; // получаем данные пользователя из запроса
            const reqUser =req.user
            if (reqBody.hasOwnProperty('newname'))
            {
                await pool.query('UPDATE public.user SET name=$2 WHERE email=$1',[reqUser.email,reqBody.newname]); // обновляем данные пользователя в базе данных
                res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
            }
            if (reqBody.hasOwnProperty('newsurname'))
            {
                await pool.query('UPDATE public.user SET surname=$2 WHERE email=$1',[reqUser.email,reqBody.newsurname]); // обновляем данные пользователя в базе данных
                res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
            }
            if (reqBody.hasOwnProperty('newpassword'))
            {
                console.log("ENter")
                const hashedPassword = await bcrypt.hash(reqBody.newpassword, 5); // хэшируем пароль
                let lastPassword = await pool.query('SELECT password FROM public.user WHERE email=$1',[reqUser.email])
                let comparePassword = bcrypt.compareSync(hashedPassword,lastPassword.rows[0].password)
                if (!comparePassword){
                    return next(ApiError.internal('Пароль не может совпадать с предыдущим!'))
                }
                await pool.query('UPDATE public.user SET password=$2 WHERE email=$1',[reqUser.email,hashedPassword]); // обновляем данные пользователя в базе данных
                res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async checkUser(req,res){
        const token = generateJWT(req.user.id,req.user.email,req.user.role)
        return res.json({token})
    }
    async deleteUser(req,res){
        try {
            const {email} = req.user; // получаем email пользователя из запроса
            const user = await pool.query('SELECT * FROM public.user WHERE email=$1',[email]);
            if (!user.rows[0]){
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            await pool.query('DELETE FROM public.user WHERE email=$1',[email]); // удаляем пользователя из базы данных
            res.status(200).json({ message: 'Пользователь успешно удален' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new UserController()