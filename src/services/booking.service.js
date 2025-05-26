import Booking from "../models/Booking.js";
import { BaseService } from "./base.service.js";
import { Op, fn, col, where } from "sequelize";

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
}
