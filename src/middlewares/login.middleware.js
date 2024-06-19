import jwt from 'jsonwebtoken';
import { Utils } from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

export class LoginMiddleware {

    constructor() {

    }

    static authorize(req, res, next) {
        const accessToken = req.cookies['accessToken'];

        if (!accessToken) {
            return res.status(401).send("Access denied. No token provided.");
        }

        try {
            console.log("AQUI AQUI" + accessToken);
            req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            next();
        }
        catch (err) {
            console.log(err);
            return Utils.buildMessage(res, "Invalid token", 401);
        }
    }
}

