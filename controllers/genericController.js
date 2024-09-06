class GenericController {
  constructor(model) {
    this.model = model;
  }

  create = async (req, res) => {
    try {
      const entity = await this.model.create(req.body);
      res.status(201).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const entities = await this.model.findAll();
      res.status(200).json(entities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const entity = await this.model.findByPk(req.params.id);
      if (entity) {
        res.status(200).json(entity);
      } else {
        res.status(404).json({ error: "Entity not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const entity = await this.model.findByPk(req.params.id);
      if (entity) {
        await entity.update(req.body);
        res.status(200).json(entity);
      } else {
        res.status(404).json({ error: "Entity not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const entity = await this.model.findByPk(req.params.id);
      if (entity) {
        await entity.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Entity not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = GenericController;
