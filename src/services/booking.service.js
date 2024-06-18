import Booking from '../models/Booking.js';
import { BaseService } from './base.service.js';

export class BookingService extends BaseService {
    constructor() {
      super();
      this._model = Booking;
    }

    get model() {
      return this._model;
    }

    async create(model) {
      model.dateStart = new Date(model.dateStart);
      model.dateEnd = new Date(model.dateEnd);

      return await this._model.create(model);
    }
}
