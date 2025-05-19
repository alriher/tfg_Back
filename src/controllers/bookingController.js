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

    async getBySpaceIdAndDate(req, res) {
        try {
            const spaceId = req.params.id;
            const date = req.query.date;

            if (!date) {
                return res.status(400).json({ message: "Date query param is required" });
            }

            const bookings = await this.service.getBySpaceIdAndDate(spaceId, date);
            return res.json(bookings);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching bookings", error });
        }
    }
}

