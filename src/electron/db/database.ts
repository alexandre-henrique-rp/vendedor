import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: false
});

// Função assíncrona para autenticar o banco de dados
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
  }
};

// Chama a função de conexão
connectDB();

export default db;
