import Space from '../models/Space.js';
import { BaseService } from './base.service.js';

export class SpaceService extends BaseService {
    constructor() {
      super();
      this._model = Space;
    }

    get model() {
      return this._model;
    }

    async getPaginated(page = 1, pageSize = 15) {
      const offset = (page - 1) * pageSize;
      const { count, rows } = await this.model.findAndCountAll({
        limit: pageSize,
        offset,
        order: [['id', 'ASC']]
      });
      return {
        total: count,
        page,
        pageSize,
        spaces: rows
      };
    }
}
