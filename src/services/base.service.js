import { Model } from "sequelize";
import { Op } from "sequelize";

export class BaseService {

    constructor() {
        if (new.target === BaseService) {
            throw new Error("Cannot instantiate abstract class directly.");
          }
    }

    get model() {
        throw new Error("Abstract property must be implemented in subclass.");
    }

    async create(model) {
        return await this.model.create(model);
    }

    // async allUsersWithoutPassword() {
    //     return await this._model.scope(['withoutPassword', 'withoutAdmin']).findAll()
    // }
}