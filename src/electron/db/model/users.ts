import { DataTypes } from "sequelize";
import db from "../database.js";


const User = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    setor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true, // Habilita createdAt e updatedAt automaticamente
    underscored: true // Usa snake_case para nomes de colunas
  }
);
User.sync();
export default User;
