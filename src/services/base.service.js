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

    async update(id, updatedModel) {
        try {
            const model = await this.model.findByPk(id);
            if(model) {	
                return await this.model.update(updatedModel, { where: { id } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id) {
        try {
            const model = await this.model.findByPk(id);
            if(model) {
                return await this.model.destroy({ where: { id } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }



    

    // async allUsersWithoutPassword() {
    //     return await this._model.scope(['withoutPassword', 'withoutAdmin']).findAll()
    // }
}