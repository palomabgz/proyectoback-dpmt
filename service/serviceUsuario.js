import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Usuario } from "../model/modelUsuario.js";
import { generateRefreshToken, generateAccessToken } from "../utils/generarTokens.js";

export const RegisterUser = async (username, password, email,fechaNacimiento) => {
    const usuario = await Usuario.findOne({username});
    console.log(usuario)
    if(usuario){
        return -1
    }
    const passhash = await bcrypt.hash(password, 10);
    const newUsuario = await Usuario.create({username, password: passhash,email,fechaNacimiento});
    return newUsuario
}

export const LoginUser = async (username, password) => {
    try {
        const user = await Usuario.findOne({username});
    if(!user) {
        return -1
    }
    const passmatch = await bcrypt.compare(password, user.password);
    if(!passmatch) {
        return -1
    }
    const accesstoken = generateAccessToken({username,password: user.password, id: user._id});
    const refreshtoken = generateRefreshToken({username,password: user.password, id: user._id});
    return {accesstoken, refreshtoken}
    } catch (error) {
        console.log(error)
    }
    
}

export const RefreshToken = async (refreshToken) => {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET|| "unaclavesecreta");

    const userDB = await Usuario.findOne({username: user.username});

    if(!userDB) {
        return -1
    }

    const accesstoken = generateAccessToken({username:user.username,password: user.password, id: user._id});
    return accesstoken
}