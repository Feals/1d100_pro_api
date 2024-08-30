exports.create = (Model) => async (req, res) => {
  try {
    const entity = await Model.create(req.body);
    res.status(201).json(entity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = (Model) => async (req, res) => {
  try {
    const entities = await Model.findAll();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = (Model) => async (req, res) => {
  try {
    const entity = await Model.findByPk(req.params.id);
    if (entity) {
      res.status(200).json(entity);
    } else {
      res.status(404).json({ error: "Entity not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = (Model) => async (req, res) => {
  try {
    const entity = await Model.findByPk(req.params.id);
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

exports.delete = (Model) => async (req, res) => {
  try {
    const entity = await Model.findByPk(req.params.id);
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
