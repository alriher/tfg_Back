import { Utils } from "../utils.js";
import { UserService } from '../services/user.service.js';
import { RefreshTokenService } from '../services/refreshToken.service.js';
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';


export class LoginController {
    constructor() {
        this._userService = new UserService();
        this._tokenService = new RefreshTokenService();
    }

    get userService() {
        return this._userService;
    }

    get tokenService() {
        return this._tokenService;
    }

    async login (req, res) {
        try {
            console.log(this.tokenService);
            console.log(this.userService);
            const { email, password } = req.body;
            const user = await this.userService.getByEmail(email);

            if (!user) {
                return Utils.buildMessage(res, 'User not found', 400);
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return Utils.buildMessage(res, 'Invalid password', 400);
            }

            const accessToken = this.tokenService.generateAccessToken(user);
            const refreshToken = this.tokenService.generateRefreshToken(user);

            const tokenRecord = await this.tokenService.getByUserId(user.id);

            if (tokenRecord) {
                await this.tokenService.deleteByToken(tokenRecord.token);
            }
            await this.tokenService.storeRefreshToken(refreshToken, user.id);

            this.tokenService.setHttpOnlyCookie(res, 'accessToken', accessToken, 5 * 60 * 1000);
            this.tokenService.setHttpOnlyCookie(res, 'refreshToken', refreshToken, 24 * 60 * 60 * 1000);

            return res.json(await this.userService.getCuratedUserAdmin(user.id));
        }
        catch (error) {
            console.log(error);
            Utils.buildMessage(res, 'Error', 500);
        }
    }

    async register (req, res) {
        try {
            const user = req.body;
            const userCheck = await this.userService.getByEmail(user.email);
            const userCheck2 = await this.userService.getByUsername(user.username);
            if (userCheck && userCheck2) {
                console.log("AQUI")
                return Utils.buildMessage(res, 'User and email already exists', 409);
            } else if (userCheck) {
                return Utils.buildMessage(res, 'Email already exists', 409);
            } else if (userCheck2) {
                return Utils.buildMessage(res, 'User already exists', 409);
            }
            
            const newUser = await this.userService.create(user);

            const accessToken = this.tokenService.generateAccessToken(newUser);
            const refreshToken = this.tokenService.generateRefreshToken(newUser);

            await this.tokenService.storeRefreshToken(refreshToken, newUser.id);

            this.tokenService.setHttpOnlyCookie(res, 'accessToken', accessToken, 5 * 60 * 1000);
            this.tokenService.setHttpOnlyCookie(res, 'refreshToken', refreshToken, 24 * 60 * 60 * 1000);
            return res.json(await this.userService.getCuratedUser(newUser.id));
        }
        catch (error) {
            console.log(error);
            Utils.buildMessage(res, 'Error', 500);
        }
    }

    async logout (req, res) {
        const refreshToken = req.cookies["refreshToken"];
        if (!refreshToken) {
            return Utils.buildMessage(res, 'No refresh token', 400);
        }
        try {
            const tokenRecord = await this.tokenService.getByToken(refreshToken);
            if(tokenRecord) {
                await this.tokenService.delete(tokenRecord.id);
            }

            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            return Utils.buildMessage(res, 'Logged out', 200);
        }
        catch (error) {
            Utils.buildMessage(res, 'Error', 500);
        }
    }

    async token (req, res) {
        try {
            const oldRefreshToken = req.cookies["refreshToken"];
            if (!oldRefreshToken) {
                return Utils.buildMessage(res, 'No refresh token', 400);
            }
            console.log("AQUI1" + oldRefreshToken);

            const tokenRecord = await this.tokenService.getByToken(oldRefreshToken);
            if (!tokenRecord || tokenRecord.expiryDate < new Date()) {
                console.log("AQUI2" + tokenRecord);
                return Utils.buildMessage(res, 'Invalid refresh token', 403);
            }
            jwt.verify (oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => { // Revisar porque user no se usa, se supone que seria userPayload.
                if (err) {
                    return Utils.buildMessage(res, 'Invalid refresh token', 403);
                }
                const newAccessToken = this.tokenService.generateAccessToken(user);
                const newRefreshToken = this.tokenService.generateRefreshToken(user);

                // Borra el refresh token antiguo de la base de datos
                await this.tokenService.deleteByToken(oldRefreshToken);
                // Guarda el nuevo refresh token en la base de datos
                await this.tokenService.storeRefreshToken(newRefreshToken, user.id);

                this.tokenService.setHttpOnlyCookie(res, 'accessToken', newAccessToken, 5 * 60 * 1000);
                this.tokenService.setHttpOnlyCookie(res, 'refreshToken', newRefreshToken, 24 * 60 * 60 * 1000);

                return Utils.buildMessage(res, 'Token refreshed', 200);
            });
        }
        catch (error) {
            console.log(error);
            Utils.buildMessage(res, 'Error', 500);
        }
    }

        

    
    
}