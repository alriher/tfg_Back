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

    async create(object) {
      object.password = bcrypt.hashSync(object.password, 12);
      object.birthdate = new Date(object.birthdate);

      return await this.model.create(object);
    }

    async update(id, object) {
      if (object.password) {
        object.password = bcrypt.hashSync(object.password, 12);
      }
      if (object.birthdate) {
        object.birthdate = new Date(object.birthdate);
      }

      return await this.model.update(object, { where: { id } });
    }

    async getByUsername(username) {
      return await this.model.findOne({ where: { username } });
    }

    async getByEmail(email) {
      return await this.model.findOne({ where: { email } });
    }

    async getCuratedUser(id) { 
      return await this.model.scope(['withoutPassword', 'withoutAdmin']).findByPk(id)
      }
}
