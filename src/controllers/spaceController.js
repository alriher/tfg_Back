import { CrudController } from './crudController.js';
import { SpaceService } from '../services/space.service.js';
import Space from '../models/Space.js';

export class SpaceController extends CrudController {
    constructor()  {
        super();
        this._service = new SpaceService();
    }

    get service() {
        return this._service;
    }

    async getPaginated(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 15;
            // Extraer filtros
            const filters = {
                name: req.query.name,
                username: req.query.username,
                provincia: req.query.provincia,
                localidad: req.query.localidad
            };
            const result = await this.service.getPaginated(page, pageSize, filters);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching paginated spaces", error });
        }
    }

    async getByUserPaginated(req, res) {
        try {
            const userId = req.params.userId;
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 15;
            const result = await this.service.getByUserPaginated(userId, page, pageSize);
            return res.json(result);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user's spaces", error });
        }
    }
}

