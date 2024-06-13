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
            const deletedModel = await this.service.delete(req.params.id);
            res.json(deletedModel);
        } catch (error) {
            res.json({ message: error.message });
        }
    };
}
