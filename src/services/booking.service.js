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
      model.date_start = new Date(model.date_start);
      model.date_end = new Date(model.date_end);

      return await this._model.create(model);
    }
}
