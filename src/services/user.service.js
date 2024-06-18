import User from '../models/User.js';
import bcrypt from 'bcrypt';    
import { BaseService } from './base.service.js';

export class UserService extends BaseService {
    constructor() {
      super();
      this._model = User;
    }

    get model() {
      return this._model;
    }

    async create(model) {
      model.password = bcrypt.hashSync(model.password, 12);
      model.birthdate = new Date(model.birthdate);

      return await this._model.create(model);
    }

    async update(id, model) {
      if (model.password) {
        model.password = bcrypt.hashSync(model.password, 12);
      }
      if (model.birthdate) {
        model.birthdate = new Date(model.birthdate);
      }

      return await this._model.update(model, { where: { id } });
    }

    async getByUsername(username) {
      return await this._model.findOne({ where: { username } });
    }
}
