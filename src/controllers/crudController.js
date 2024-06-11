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
}
