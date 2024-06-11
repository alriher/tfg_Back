
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
}
