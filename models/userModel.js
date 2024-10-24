const db = require('../config/database');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    age INTEGER,
    birthdate TEXT,
    phone TEXT,
    email TEXT,
    mother_name TEXT,
    father_name TEXT,
    address TEXT
  )
`);

const createUser = (user, callback) => {
  const { name, age, birthdate, phone, email, mother_name, father_name, address } = user;
  const sql = `INSERT INTO users (name, age, birthdate, phone, email, mother_name, father_name, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [name, age, birthdate, phone, email, mother_name, father_name, address], function (err) {
    callback(err, { id: this.lastID });
  });
};

const updateUser = (id, user, callback) => {
  const { name, age, birthdate, phone, email, mother_name, father_name, address } = user;
  const sql = `UPDATE users SET name = ?, age = ?, birthdate = ?, phone = ?, email = ?, mother_name = ?, father_name = ?, address = ? WHERE id = ?`;
  db.run(sql, [name, age, birthdate, phone, email, mother_name, father_name, address, id], function (err) {
    callback(err);
  });
};

const deleteUser = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err);
  });
};

const listUsers = (callback) => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

module.exports = { createUser, updateUser, deleteUser, listUsers };
