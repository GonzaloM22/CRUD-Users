const data = require('../db.json');

const listUsers = (name, lastName, id) => {
  let users = data;

  if (id) {
    users = data.users.filter((user) => user.id == id);
  }
  if (name) {
    users = data.users.filter((user) => user.name == name);
  }
  if (lastName) {
    users = data.users.filter((user) => user.lastName == lastName);
  }
  if (name && lastName) {
    users = data.users.filter(
      (user) => user.lastName == lastName && user.name == name
    );
  }
  return users;
};

const createUser = (user) => {
  data.users.push(user);

  return true;
};

const modifyUser = (user) => {
  const { id } = user;

  const userModified = data.users.map((userState) =>
    userState.id === id ? user : userState
  );
  data.users = userModified;
};

const removeUser = (user) => {
  const { id } = user;

  const userDeleted = data.users.filter((userState) => userState.id !== id);

  data.users = userDeleted;
};

module.exports = { listUsers, createUser, modifyUser, removeUser };
