const {
  listUsers,
  createUser,
  modifyUser,
  removeUser,
} = require('../services/usersService.js');

const getUsers = (req, res) => {
  const { name, lastName, id } = req.query;

  try {
    const result = listUsers(name, lastName, id);

    if (result.length === 0)
      return res
        .status(404)
        .json({ ok: false, message: 'El usuario no existe' });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: 'Error inesperado' });
  }
};

const newUser = (req, res) => {
  const user = req.body;
  const { id, name, lastName, dni } = user;

  const exists = listUsers(null, null, id);

  if (!id || !name || !lastName || !dni)
    return res.status(401).json({
      ok: false,
      message: 'No se recibieron todos los datos del usuario',
    });

  if (exists.length > 0) {
    return res.status(404).json({
      ok: false,
      message: 'El usuario ya existe',
    });
  }

  createUser(user);
  return res
    .status(200)
    .json({ ok: true, message: 'Usuario creado con exito' });
};

const updateUser = (req, res) => {
  const user = req.body;
  const { id } = user;
  const existsUser = listUsers(null, null, id);

  if (existsUser.length === 0) {
    return res.status(404).json({
      ok: false,
      message: 'El usuario no existe',
    });
  }

  modifyUser(user);
  return res
    .status(200)
    .json({ ok: true, message: 'Usuario modificado con exito' });
};

const deleteUser = (req, res) => {
  const { id } = req.query;

  const user = listUsers(null, null, id);

  if (user.length === 0) {
    return res.status(404).json({
      ok: false,
      message: 'El usuario no existe',
    });
  }

  removeUser(user[0]);
  return res
    .status(200)
    .json({ ok: true, message: 'Usuario Eliminado con exito' });
};

module.exports = { getUsers, newUser, updateUser, deleteUser };
