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
        const user = await pool.query('SELECT id,email,password,role,name FROM public.user WHERE email=$1',[email])
        if ((0 === user.rows[0].length)){
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
    async updateUser(req,res){
        try {
            const reqBody = req.body; // получаем данные пользователя из запроса
            if (reqBody.hasOwnProperty('newname'))
            {
                await pool.query('UPDATE public.user SET name=$2 WHERE email=$1',[reqBody.email,reqBody.newname]); // обновляем данные пользователя в базе данных
                res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
            }
            if (reqBody.hasOwnProperty('newsurname'))
            {
                await pool.query('UPDATE public.user SET surname=$2 WHERE email=$1',[reqBody.email,reqBody.newsurname]); // обновляем данные пользователя в базе данных
                res.status(200).json({ message: 'Данные пользователя успешно обновлены' });
            }
            if (reqBody.hasOwnProperty('newpassword'))
            {
                const hashedPassword = await bcrypt.hash(reqBody.password, 5); // хэшируем пароль
                let lastPassword = pool.query('SELECT password FROM public.user WHERE email=$1',[reqBody.newemail])
                if(hashedPassword === lastPassword)
                {
                    res.json({message: 'Пароль не может совпадать с предыдущим!'})
                }
                await pool.query('UPDATE public.user SET password=$2 WHERE email=$1',[reqBody.email,hashedPassword]); // обновляем данные пользователя в базе данных
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
            const {email} = req.body; // получаем email пользователя из запроса
            const user = await pool.query('DELETE FROM public.user WHERE email=$1',[email]); // удаляем пользователя из базы данных
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
            res.status(200).json({ message: 'Пользователь успешно удален' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
module.exports = new UserController()