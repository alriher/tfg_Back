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
            // console.log("BOOKINGS" + JSON.stringify(bookings));
            return res.json(bookings);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching bookings", error });
        }
    }

    async getByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const bookings = await this.service.getByUserId(userId);
            return res.json(bookings);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user's bookings", error });
        }
    }

    async update(req, res) {
        try {
            const bookingId = req.params.id;
            const { dateStart, dateEnd, assistants } = req.body;
            const updated = await this.service.update(bookingId, { dateStart, dateEnd, assistants });
            if (updated[0] === 1) {
                return res.json({ message: "Booking updated successfully" });
            } else {
                return res.status(404).json({ message: "Booking not found or not updated" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error updating booking", error });
        }
    }
}

