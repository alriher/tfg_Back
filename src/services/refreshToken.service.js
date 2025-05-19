import { BaseService } from "./base.service.js";
import RefreshToken from "../models/RefreshToken.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

export class RefreshTokenService extends BaseService {
    constructor() {
        super();
        this._model = RefreshToken;
    }

    get model() {
        return this._model;
    }

    // async deleteByToken(token): Promise<number> { ????
    async deleteByToken(token) {
        return this.model.destroy({ where: { token } });
    }
    async getByToken(token) {
        return this.model.findOne({ where: { token } });
    }
    async getByUserId(userId) {
        return this.model.findOne({ where: { userId } });
    }

    setHttpOnlyCookie(res, name, value, maxAge) {
        res.cookie(name, value, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge,
        });
    }

    async storeRefreshToken(
        refreshToken,
        userId,
    ) {
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24);
        return await RefreshToken.create({
            token: refreshToken,
            userId,
            expiryDate,
        });
    }

    generateTokenPayload(user) {
        return { id: user.id, username: user.username,  email: user.email };
    }

    generateAccessToken(user) {
        return jwt.sign( { id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    }

    generateRefreshToken(user) {
        return jwt.sign( { id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '24h' });
    }
}