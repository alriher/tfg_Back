import Space from '../models/Space.js';
import User from '../models/User.js';
import { BaseService } from './base.service.js';
import { Op } from 'sequelize';

export class SpaceService extends BaseService {
    constructor() {
      super();
      this._model = Space;
    }

    get model() {
      return this._model;
    }

    async getPaginated(page = 1, pageSize = 15, filters = {}) {
      const offset = (page - 1) * pageSize;
      const where = {};
      if (filters.name) {
        where.name = { [Op.like]: `%${filters.name}%` };
      }
      if (filters.provincia) {
        where.provincia = { [Op.like]: `%${filters.provincia}%` };
      }
      if (filters.localidad) {
        where.localidad = { [Op.like]: `%${filters.localidad}%` };
      }
      let include = [
        {
          model: User,
          attributes: ['id', 'username'],
        }
      ];
      if (filters.username) {
        include[0].where = { username: { [Op.like]: `%${filters.username}%` } };
      }
      const { count, rows } = await this.model.findAndCountAll({
        where,
        include,
        limit: pageSize,
        offset,
        order: [['provincia', 'ASC'], ['id', 'ASC']]
      });
      // Mapear para incluir el username como user en cada espacio
      const spaces = rows.map(s => {
        const space = s.toJSON();
        if (space.User) {
          space.user = space.User.username;
          delete space.User;
        }
        return space;
      });
      return {
        total: count,
        page,
        pageSize,
        spaces
      };
    }

    async getByUserPaginated(userId, page = 1, pageSize = 15) {
      const offset = (page - 1) * pageSize;
      const { count, rows } = await this.model.findAndCountAll({
        where: { user_id: userId },
        include: [{ model: User, attributes: ['id', 'username'] }],
        limit: pageSize,
        offset,
        order: [['provincia', 'ASC'], ['id', 'ASC']]
      });
      const spaces = rows.map(s => {
        const space = s.toJSON();
        if (space.User) {
          space.user = space.User.username;
          delete space.User;
        }
        return space;
      });
      return {
        total: count,
        page,
        pageSize,
        spaces
      };
    }
}
