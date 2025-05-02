const models = require("../database/models");

// Crear
const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    console.error('Error creando usuario:', error); // ← Log del error
    return res.status(500).json({
      error: error.message,
      details: error.errors?.map(e => e.message) // ← Detalles de validación
    });
  }
};

// Leer todos
const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // En Postgres returning funciona; en MySQL se ignoraría y podrías hacer un find después.
    const [count, [updatedUser]] = await models.User.update(
      req.body,
      { where: { id }, returning: true }
    );
    if (count === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Borrar
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await models.User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};

