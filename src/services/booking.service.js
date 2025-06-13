import Booking from "../models/Booking.js";
import { BaseService } from "./base.service.js";
import { Op, fn, col, where } from "sequelize";
import Space from "../models/Space.js"; // Import Space model for inclusion

export class BookingService extends BaseService {
  constructor() {
    super();
    this._model = Booking;
  }

  get model() {
    return this._model;
  }

  async create(model) {
    console.log("MODELO RECIBIDO:", model);
    model.dateStart = new Date(model.dateStart);
    model.dateEnd = new Date(model.dateEnd);
    return await this._model.create(model);
  }

  async getBySpaceIdAndDate(spaceId, date) {
    return this.model.findAll({
      where: {
        spaceId,
        [Op.and]: [where(fn("DATE", col("date_start")), date)],
      },
    });
  }

  async getByUserId(userId) {
    console.log("FECHA AHORA", new Date());
    return this.model.findAll({
      where: {
        userId,
        dateEnd: { [Op.gt]: new Date() },
      },
      include: [{ model: Space }],
    });
  }

  async update(bookingId, { dateStart, dateEnd, assistants }) {
    const updateFields = {};
    if (dateStart) updateFields.dateStart = new Date(dateStart);
    if (dateEnd) updateFields.dateEnd = new Date(dateEnd);
    if (assistants !== undefined) updateFields.assistants = assistants;
    return this.model.update(updateFields, { where: { id: bookingId } });
  }

  async getBySpacePaginated(spaceId, page = 1, pageSize = 15) {
    const offset = (page - 1) * pageSize;
    const { count, rows } = await this.model.findAndCountAll({
      where: { spaceId },
      limit: pageSize,
      offset,
      order: [["id", "ASC"]],
    });
    return {
      total: count,
      page,
      pageSize,
      bookings: rows,
    };
  }
}
