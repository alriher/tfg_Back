import { CrudController } from './crudController.js';
import { UserService } from '../services/user.service.js';

export class UserController extends CrudController {
    constructor()  {
        super();
        this._service = new UserService();
    }

    get service() {
        return this._service;
    }
}

