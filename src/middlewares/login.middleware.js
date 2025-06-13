import jwt from 'jsonwebtoken';
import { Utils } from '../utils.js';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export class LoginMiddleware {

    constructor() {

    }
    static async authorize(req, res, next) {
        const accessToken = req.cookies['accessToken'];

        if (!accessToken) {
            return res.status(401).send("Access denied. No token provided.");
        }

        try {
            const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            // Buscar el usuario real para añadir isAdmin e isSpaceAdmin
            const userDb = await User.findByPk(payload.id);
            if (!userDb) {
                return res.status(401).send("User not found");
            }
            req.user = {
                id: userDb.id,
                isAdmin: userDb.isAdmin,
                isSpaceAdmin: userDb.isSpaceAdmin
            };
            next();
        } catch (err) {
            console.log(err);
            return Utils.buildMessage(res, "Invalid token", 401);
        }
    }

    static requireSpaceAdmin(req, res, next) {
        if (!req.user || (!req.user.isSpaceAdmin && !req.user.isAdmin)) {
            return res.status(403).json({ message: "Only space admins can perform this action" });
        }
        next();
    }

    static requireAdmin(req, res, next) {
        console.log("AQUI AQUI AQUI", req.user);
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: "Only admins can perform this action" });
        }
        next();
    }
}

