const userModel = require('../models/userModel');

const createUser = (req, res) => {
  const user = req.body;
  userModel.createUser(user, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso', userId: result.id });
    }
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const user = req.body;
  userModel.updateUser(id, user, (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    } else {
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.deleteUser(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    } else {
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    }
  });
};

const listUsers = (req, res) => {
  userModel.listUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    } else {
      res.status(200).json(users);
    }
  });
};

module.exports = { createUser, updateUser, deleteUser, listUsers };
