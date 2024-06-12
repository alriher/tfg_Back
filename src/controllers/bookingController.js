import { CrudController } from './crudController.js';
import { BookingService } from '../services/booking.service.js';
import Booking from '../models/Booking.js';

export class BookingController extends CrudController {
    constructor()  {
        super();
        this._service = new BookingService();
    }

    get service() {
        return this._service;
    }
}

