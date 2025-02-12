const db = require("../database");

const UserModel = {
  // Criar um novo usuário
  insert: (name) => {
    const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
    const result = stmt.run(name);
    return result.lastInsertRowid;
  },

  // Buscar todos os usuários
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM users');
    return stmt.all();
  },

  // Buscar usuário por ID
  getById: (id) => {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  },

  // Atualizar usuário por ID
  update: (id, name) => {
    const stmt = db.prepare('UPDATE users SET name = ? WHERE id = ?');
    const result = stmt.run(name, id);
    return result.changes > 0; // Retorna true se a atualização foi bem-sucedida
  },

  // Excluir usuário por ID
  delete: (id) => {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0; // Retorna true se o usuário foi deletado
  }
};

module.exports = UserModel;
