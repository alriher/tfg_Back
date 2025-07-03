export class CrudController {

    constructor() {
        if (new.target === CrudController) {
            throw new Error("Cannot instantiate abstract class directly.");
          }
    }

    get service() {
        throw new Error("Abstract property must be implemented in subclass.");
    }

    async create(req, res) {

        console.log("es this" + this)
        try {
            console.log("aquiii create" + this.service)
            const newModel = await this.service.create(req.body);
            res.json(newModel);
        } catch (error) {
            console.log("error" + this.service)
            res.json({ message: error.message });
        }
    };

    async update(req, res) {
        try {
            const updatedModel = await this.service.update(req.params.id, req.body);
            res.json(updatedModel);
        } catch (error) {
            res.json({ message: error.message });
        }
    };

    async delete(req, res) {
        try {
            console.log("[CrudController] Intentando eliminar espacio con id:", req.params.id);
            const deletedModel = await this.service.delete(req.params.id);
            console.log("[CrudController] Resultado delete:", deletedModel);
            res.json(deletedModel);
        } catch (error) {
            console.log("[CrudController] Error al eliminar:", error);
            res.json({ message: error.message });
        }
    };

    async getAll(req, res) {
        try {
            const models = await this.service.getAll();
            res.json(models);
        } catch (error) {
            res.json({ message: error.message });
        }
    };

    async getById(req, res) {
        try {
            const model = await this.service.getById(req.params.id);
            res.json(model);
        } catch (error) {
            res.json({ message: error.message });
        }
    };
}

