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
}

