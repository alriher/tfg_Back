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
}
