import { CrudController } from './crudController.js';
import { UserService } from '../services/user.service.js';
import bcrypt from 'bcrypt';

export class UserController extends CrudController {
    constructor() {
        super();
        this._service = new UserService();
    }

    get service() {
        return this._service;
    }

    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 15;
            const search = req.query.search || "";
            const result = await this.service.getPaginated(page, pageSize, search);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching paginated users", error });
        }
    }

    async patchUpdate(req, res) {
        try {
            const userId = req.params.id;
            const { isSpaceAdmin } = req.body;
            const updated = await this.service.update(userId, { isSpaceAdmin });
            if (updated[0] === 1) {
                return res.json({ message: "User updated successfully" });
            } else {
                return res.status(404).json({ message: "User not found or not updated" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error updating user", error });
        }
    }

    async patchProfileUpdate(req, res) {
        try {
            const userId = req.params.id;
            const { name, lastName, birthdate, address, phone } = req.body;
            const updateFields = {};
            if (name !== undefined) updateFields.name = name;
            if (lastName !== undefined) updateFields.lastName = lastName;
            if (birthdate !== undefined) {
                updateFields.birthdate = birthdate;
                console.log("[patchProfileUpdate] birthdate recibido:", birthdate, typeof birthdate);
            }
            if (address !== undefined) updateFields.address = address;
            if (phone !== undefined) updateFields.phone = phone;

            if (Object.keys(updateFields).length === 0) {
                return res.status(400).json({ message: "No valid profile fields provided for update" });
            }

            const updated = await this.service.update(userId, updateFields);
            if (updated[0] === 1) {
                // Obtener el usuario actualizado y devolverlo curado
                const user = await this.service.getCuratedUserAdmin(userId);
                return res.json({ message: "Profile updated successfully", user });
            } else {
                return res.status(404).json({ message: "User not found or not updated" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error updating profile", error });
        }
    }

    async changePassword(req, res) {
        try {
            const userId = req.params.id;
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: "Current and new password are required" });
            }
            // Obtener el usuario
            const user = await this.service.model.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Verificar contraseña actual
            const valid = await bcrypt.compare(currentPassword, user.password);
            if (!valid) {
                return res.status(401).json({ message: "Current password is incorrect" });
            }
            // Actualizar contraseña usando el service (que ya la encripta)
            const updated = await this.service.update(userId, { password: newPassword });
            // Devolver usuario curado
            const userCurated = await this.service.getCuratedUserAdmin(userId);
            return res.json({ message: "Password updated successfully", user: userCurated });
        } catch (error) {
            console.error("[changePassword] error:", error);
            return res.status(500).json({ message: "Error updating password", error });
        }
    }
}

