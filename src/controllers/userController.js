import { CrudController } from './crudController.js';
import { UserService } from '../services/user.service.js';

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
}

