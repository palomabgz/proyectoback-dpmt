import { RegisterUser, LoginUser, RefreshToken } from "../service/serviceUsuario.js";

export const RegisterUserController = async (req, res) => {
    try {
        const { username, password,email,fechaNacimiento } = req.body;
        const user = await RegisterUser(username, password,email,fechaNacimiento);
        if (user===-1) {
            return res.status(400).json({status: "error", menssage: "error en el servidor", data:{}});
        }else{
            return res.status(201).json({status: "success", menssage: "usuario creado", data:user});
        }
    } catch (error) {
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}

export const LoginUserController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const {accesstoken, refreshtoken} = await LoginUser(username, password);
        if (!accesstoken || !refreshtoken) {
            return res.status(400).json({status: "error", menssage: "error en el servidor", data:{}});
        }else{
            return res.status(200).json({status: "success", menssage: "usuario logueado", data:{accesstoken, refreshtoken}});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}

export const RefreshTokenController = async (req, res) => {
    try {
        const refreshtoken = req.headers["x-refresh-token"]
        if (!refreshtoken) {
            return res.status(400).json({status: "error", menssage: "error en el servidor", data:{}});
        }
        const accesstoken = await RefreshToken(refreshtoken);
        return res.status(200).json({status: "success", menssage: "token actualizado", data:{accesstoken}});
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: "error", menssage: "error en el servidor", data:{}});
    }
}