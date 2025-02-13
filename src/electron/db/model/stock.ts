import { DataTypes } from "sequelize";
import db from "../database.js";
import Product from "./products.js";


const Stock = db.define(
  "Stock",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: true, // Habilita createdAt e updatedAt automaticamente
    underscored: true // Usa snake_case para nomes de colunas
  }
);
Stock.sync();
export default Stock;