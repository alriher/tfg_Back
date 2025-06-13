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
            console.log("[BaseService] Intentando eliminar espacio con id:", id);
            const model = await this.model.findByPk(id);
            if(model) {
                const result = await this.model.destroy({ where: { id } });
                console.log("[BaseService] Resultado destroy:", result);
                return result;
            } else {
                console.log("[BaseService] No se encontró el modelo con id:", id);
            }
        } catch (error) {
            console.error("[BaseService] Error al eliminar:", error);
        }
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async getAll() {
        return await this.model.findAll();
    }



    

    // async allUsersWithoutPassword() {
    //     return await this._model.scope(['withoutPassword', 'withoutAdmin']).findAll()
    // }
}