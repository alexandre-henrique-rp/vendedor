// criar tabela de vendas contendo id, userId, productId, createdAt, updatedAt, relacionado o userId com o usuário e o productId com o produto

import { DataTypes } from "sequelize";
import db from "../database.js";
import User from "./users.js";
import Product from "./products.js";

const Sales = db.define(
  "Sales",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    }
  },
  {
    timestamps: true, // Habilita createdAt e updatedAt automaticamente
    underscored: true // Usa snake_case para nomes de colunas
  }
);
Sales.sync();
export default Sales;